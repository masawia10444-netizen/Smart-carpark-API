const express = require('express');
const { store, createId } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');
const { authorize } = require('../middlewares/auth.middleware');
const { listAllKiosks, generateActivationCode } = require('../data/repositories/kiosks.repo');

const router = express.Router();
const CONFIG_KEY = 'devices';

router.use(authorize(['super_admin', 'staff'], 'devices'));

function refreshSummary(devicesConfig) {
  if (!devicesConfig.summary) devicesConfig.summary = {};
  devicesConfig.summary.totalDevices = (devicesConfig.devices || []).length;
  devicesConfig.summary.online = (devicesConfig.devices || []).filter((item) => item.isOnline).length;
  devicesConfig.summary.offline = (devicesConfig.devices || []).filter((item) => !item.isOnline).length;
}

router.get('/config', async (req, res, next) => {
  try {
    const config = await getConfig(CONFIG_KEY, store.devices);
    refreshSummary(config);
    res.json(config);
  } catch (err) {
    next(err);
  }
});

/**
 * 🛰️ GET /api/v1/devices/kiosks
 * เส้นทางใหม่สำหรับแอดมินดูสถานะตู้ Kiosk ทั้งหมด
 */
router.get('/kiosks', async (req, res, next) => {
  try {
    const kiosks = await listAllKiosks();
    res.json({
      total: kiosks.length,
      online: kiosks.filter(k => k.status === 'online').length,
      kiosks
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 🎫 POST /api/v1/devices/kiosks/activation-code
 * แอดมินออกรหัส 6 หลักเพื่อให้ช่างเอาไปกรอกที่ตู้
 */
router.post('/kiosks/activation-code', async (req, res, next) => {
  try {
    const { name, location } = req.body;
    if (!name) return res.status(400).json({ message: 'Kiosk name is required' });

    const code = await generateActivationCode({ name, location });
    res.json({ 
      message: 'Activation code generated', 
      code,
      expiresIn: '1 hour'
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.deviceName || !payload.deviceType || !payload.connectionType) {
      return res.status(400).json({ message: 'deviceName, deviceType, and connectionType are required' });
    }

    const config = await getConfig(CONFIG_KEY, store.devices);
    const device = {
      id: createId('d'),
      deviceCode: payload.deviceCode || `DEV-${Date.now()}`,
      deviceName: payload.deviceName,
      deviceType: payload.deviceType,
      connectionType: payload.connectionType,
      ipAddress: payload.ipAddress || null,
      status: payload.status || 'active',
      isOnline: Boolean(payload.isOnline),
      note: payload.note || null
    };

    config.devices = [...(config.devices || []), device];
    refreshSummary(config);
    await setConfig(CONFIG_KEY, config);
    res.status(201).json({ message: 'Device created', device });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const config = await getConfig(CONFIG_KEY, store.devices);
    const device = (config.devices || []).find((item) => item.id === req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    Object.assign(device, {
      deviceCode: req.body.deviceCode ?? device.deviceCode,
      deviceName: req.body.deviceName ?? device.deviceName,
      deviceType: req.body.deviceType ?? device.deviceType,
      connectionType: req.body.connectionType ?? device.connectionType,
      ipAddress: req.body.ipAddress ?? device.ipAddress,
      status: req.body.status ?? device.status,
      isOnline: req.body.isOnline ?? device.isOnline,
      note: req.body.note ?? device.note
    });

    refreshSummary(config);
    await setConfig(CONFIG_KEY, config);
    res.json({ message: 'Device updated', device });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const config = await getConfig(CONFIG_KEY, store.devices);
    const index = (config.devices || []).findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const nextDevices = [...config.devices];
    const [device] = nextDevices.splice(index, 1);
    config.devices = nextDevices;
    refreshSummary(config);
    await setConfig(CONFIG_KEY, config);
    res.json({ message: 'Device deleted', device });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
