const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { store } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');
const appEvents = require('../utils/events'); // [NEW] นำเข้า Event Emitter
const { authorize } = require('../middlewares/auth.middleware');

const router = express.Router();
const CONFIG_KEY = 'theme';

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, png, svg, webp) are allowed!'));
  }
});

const DEFAULT_THEME = {
  mode: 'preset1',
  themeColor: '#FFD54F',
  logoUrl: null
};

router.use(authorize(['super_admin', 'staff'], 'theme'));

router.get('/', async (req, res, next) => {
  try {
    let theme = await getConfig(CONFIG_KEY, store.theme);
    if (!theme || !theme.mode) {
      theme = { ...DEFAULT_THEME, ...theme };
    }
    // ส่ง presets กลับไปให้ Frontend ทำ UI โดยดึงจาก store
    res.json({ ...theme, presets: store.themePresets });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let current = await getConfig(CONFIG_KEY, store.theme);
    if (!current || !current.mode) {
      current = { ...DEFAULT_THEME, ...current };
    }

    const body = req.body;
    let newMode = body.mode || current.mode;
    let newThemeColor = current.themeColor;

    // คำนวณ themeColor ตามโหมดที่เลือก
    if (newMode === 'custom') {
      newThemeColor = body.themeColor || current.themeColor;
    } else if (store.themePresets && store.themePresets[newMode]) {
      const preset = store.themePresets[newMode];
      newThemeColor = preset.themeColor;
    }

    const nextTheme = {
      ...current,
      ...body,
      mode: newMode,
      themeColor: newThemeColor,
      // ลบตัวแปรเก่าๆ ออกเพื่อไม่ให้รก
      primaryColor: undefined,
      secondaryColor: undefined,
      customColor: undefined,
      themeName: undefined,
      updatedAt: new Date().toISOString()
    };

    const saved = await setConfig(CONFIG_KEY, nextTheme);
    appEvents.emit('theme_updated', saved); // แจ้งเตือน Kiosk
    res.json({ message: 'Theme updated', theme: { ...saved, presets: store.themePresets } });
  } catch (err) {
    next(err);
  }
});

// New Logo Upload Endpoint
router.post('/upload-logo', upload.single('logo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const logoUrl = `/uploads/${req.file.filename}`;
    const current = await getConfig(CONFIG_KEY, store.theme);
    
    // Optional: Delete old logo file before updating
    if (current.logoUrl) {
      const oldPath = path.join(process.cwd(), current.logoUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const nextTheme = {
      ...current,
      logoUrl: logoUrl,
      updatedAt: new Date().toISOString()
    };
    
    const saved = await setConfig(CONFIG_KEY, nextTheme);
    appEvents.emit('theme_updated', saved); // แจ้งเตือน Kiosk
    
    res.json({ 
      message: 'Logo uploaded successfully', 
      logoUrl: logoUrl,
      theme: saved 
    });
  } catch (err) {
    next(err);
  }
});

// NEW: Delete Logo Endpoint
router.delete('/logo', async (req, res, next) => {
  try {
    const current = await getConfig(CONFIG_KEY, store.theme);
    
    if (current.logoUrl) {
      const filePath = path.join(process.cwd(), current.logoUrl);
      // Delete physical file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Reset logoUrl in config
    const nextTheme = {
      ...current,
      logoUrl: null,
      updatedAt: new Date().toISOString()
    };

    const saved = await setConfig(CONFIG_KEY, nextTheme);
    appEvents.emit('theme_updated', saved); // แจ้งเตือน Kiosk
    res.json({ message: 'Logo deleted and reset successfully', theme: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
