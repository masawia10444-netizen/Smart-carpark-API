const { store } = require('../store');

// เก็บรายการรหัสลงทะเบียนชั่วคราว
const activationCodes = new Map();

/**
 * 🎫 Generate Activation Code (Admin Side)
 */
async function generateActivationCode(details = {}) {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // สุ่มเลข 6 หลัก
  
  // [NEW] เจน Device ID ไว้รอเลยตั้งแต่ออก Code
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = (store.kiosks.length + activationCodes.size + 1).toString().padStart(3, '0');
  const generatedId = `K-${dateStr}-${count}`;

  activationCodes.set(code, {
    ...details,
    deviceId: generatedId, // เก็บ ID ที่จองไว้
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // หมดอายุใน 1 ชม.
  });

  return { code, deviceId: generatedId };
}

/**
 * 🔑 Activate Kiosk (Kiosk Side)
 */
async function activateKiosk(code) {
  const data = activationCodes.get(code);
  
  if (!data) return { success: false, message: 'Invalid or expired code' };
  if (data.expiresAt < new Date()) {
    activationCodes.delete(code);
    return { success: false, message: 'Code expired' };
  }

  // ใช้ ID ที่จองไว้ตั้งแต่ตอนออก Code
  const reservedId = data.deviceId;

  // ลงทะเบียนตู้เข้าระบบจริง
  const kiosk = await updateKioskStatus(reservedId, {
    name: data.name,
    location: data.location,
    version: '1.0.0'
  });

  activationCodes.delete(code); // ใช้แล้วทิ้ง
  return { 
    success: true, 
    message: 'Activation successful',
    deviceId: reservedId, 
    kiosk 
  };
}

/**
 * ✏️ Edit Kiosk Details (Admin Side)
 */
async function editKiosk(deviceId, details = {}) {
  const kiosk = store.kiosks.find(k => k.deviceId === deviceId);
  if (!kiosk) return { success: false, message: 'Kiosk not found' };

  if (details.name) kiosk.name = details.name;
  if (details.location) kiosk.location = details.location;
  if (details.status) kiosk.status = details.status; // เช่น 'maintenance', 'offline'

  return { success: true, kiosk };
}

/**
 * 🗑️ Delete Kiosk (Admin Side)
 */
async function deleteKiosk(deviceId) {
  const index = store.kiosks.findIndex(k => k.deviceId === deviceId);
  if (index === -1) return { success: false, message: 'Kiosk not found' };

  const deleted = store.kiosks.splice(index, 1)[0];
  return { success: true, message: 'Kiosk deleted', kiosk: deleted };
}
async function updateKioskStatus(deviceId, details = {}) {
  let kiosk = store.kiosks.find(k => k.deviceId === deviceId);
  const now = new Date().toISOString();

  if (!kiosk) {
    // ลงทะเบียนตู้ใหม่
    kiosk = {
      deviceId,
      name: details.name || `Kiosk ${deviceId}`,
      location: details.location || 'Unknown',
      ip: details.ip || '0.0.0.0',
      version: details.version || '1.0.0',
      status: 'online',
      firstSeen: now,
      lastSeen: now
    };
    store.kiosks.push(kiosk);
  } else {
    // อัปเดตข้อมูลตู้เดิม
    kiosk.lastSeen = now;
    kiosk.status = 'online';
    if (details.name) kiosk.name = details.name;
    if (details.location) kiosk.location = details.location;
    if (details.ip) kiosk.ip = details.ip;
    if (details.version) kiosk.version = details.version;
  }

  return kiosk;
}

/**
 * 📋 List all Kiosks for Admin Monitor
 */
async function listAllKiosks() {
  const now = new Date();
  
  // ตรวจสอบเบื้องต้น: ถ้าตู้ไหนไม่ส่งสัญญาณเกิน 5 นาที ให้ถือว่าเป็น 'offline'
  return store.kiosks.map(k => {
    const lastSeen = new Date(k.lastSeen);
    const diffMinutes = Math.floor((now - lastSeen) / 60000);
    return {
      ...k,
      status: diffMinutes > 5 ? 'offline' : 'online'
    };
  });
}

module.exports = {
  updateKioskStatus,
  listAllKiosks,
  generateActivationCode,
  activateKiosk,
  editKiosk,
  deleteKiosk
};
