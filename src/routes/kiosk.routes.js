const express = require('express');
const { listTransactions, getTransactionById, processPayment, toTransactionApi } = require('../data/repositories/transactions.repo');
const { updateKioskStatus, activateKiosk } = require('../data/repositories/kiosks.repo');
const { store } = require('../data/store');

const router = express.Router();

/**
 * 🛰️ Kiosk Check-in (Heartbeat)
 * ตู้ Kiosk เรียกเส้นนี้เพื่อบอกว่ายังออนไลน์อยู่
 */
router.post('/check-in', async (req, res, next) => {
  try {
    const { deviceId, name, location, version } = req.body;
    if (!deviceId) return res.status(400).json({ message: 'deviceId is required' });

    const kiosk = await updateKioskStatus(deviceId, { 
      name, 
      location, 
      version,
      ip: req.ip // เก็บ IP จริงของตู้ไว้ด้วย
    });

    res.json({ 
      message: 'Check-in successful', 
      status: kiosk.status, // [NEW] บอกสถานะตู้กลับไป
      kiosk 
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 🔑 Kiosk Activation
 * นำรหัส 6 หลักมาแลกเป็นสิทธิ์การใช้งาน
 */
router.post('/activate', async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Activation code is required' });

    const result = await activateKiosk(code);
    if (!result.success) return res.status(400).json(result);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * 🎨 Kiosk Config
 * ดึงธีมสีและโลโก้ที่แอดมินตั้งค่าไว้ไปใช้ที่หน้าตู้
 */
router.get('/config', async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    let currentStatus = 'online';
    
    if (deviceId) {
      const kiosk = store.kiosks.find(k => k.deviceId === deviceId);
      if (kiosk) currentStatus = kiosk.status;
    }

    res.json({
      theme: store.theme || { primaryColor: '#1a73e8', logoUrl: null },
      systemName: 'Smart Carpark Kiosk',
      status: currentStatus // [NEW] บอกสถานะตู้กลับไป
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 🔍 Kiosk Search API
 * ค้นหารถที่ยังจอดอยู่ในอาคาร (Status: pending / partially_paid)
 */
router.get('/search', async (req, res, next) => {
  try {
    const { plateNo, deviceId } = req.query;
    if (!plateNo) {
      return res.status(400).json({ message: 'Plate number is required' });
    }

    // ถ้าส่ง deviceId มาด้วย ให้ถือเป็นการ Check-in ไปในตัว
    if (deviceId) {
      await updateKioskStatus(deviceId, { ip: req.ip });
    }

    // ค้นหาเฉพาะรถที่สถานะยังไม่เสร็จสิ้น (ยังอยู่ในอาคาร)
    const result = await listTransactions({ 
      plateNo, 
      status: 'pending', // ค้นหารถที่ค้างจ่าย
      perPage: 5 
    });

    res.json({
      count: result.total,
      items: result.data.map(toTransactionApi)
    });
  } catch (err) {
    next(err);
  }
});

/**
 * 📄 Kiosk Transaction Details
 * ดูรายละเอียดและยอดเงินปัจจุบันของรถคันนั้นๆ
 */
router.get('/transaction/:id', async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // ห้ามดูข้อมูลรถที่ออกไปแล้วผ่านช่องทาง Kiosk เพื่อความเป็นส่วนตัว
    if (transaction.status === 'completed' || transaction.status === 'cancelled') {
      return res.status(403).json({ message: 'This transaction is already processed' });
    }

    res.json(toTransactionApi(transaction));
  } catch (err) {
    next(err);
  }
});

/**
 * 💰 Kiosk Payment API
 * บันทึกการชำระเงินจากตู้ Kiosk (จำลองการรับเงินจากตู้)
 */
router.post('/payment', async (req, res, next) => {
  try {
    const { transactionId, method, amount, deviceId } = req.body;
    
    // [NEW] ตรวจสอบสถานะตู้ก่อนรับเงิน
    if (deviceId) {
      const kiosk = store.kiosks.find(k => k.deviceId === deviceId);
      if (kiosk && kiosk.status === 'maintenance') {
        return res.status(403).json({ 
          message: 'This kiosk is currently under maintenance. Payment is disabled.',
          status: 'maintenance'
        });
      }
      await updateKioskStatus(deviceId, { ip: req.ip });
    }

    // บันทึกการจ่ายเงิน โดยระบุช่องทางเป็น 'kiosk'
    const result = await processPayment(transactionId, {
      method: method || 'qr_code', 
      channel: 'kiosk',
      amount: amount,
      processedBy: deviceId ? `kiosk_${deviceId}` : 'system_kiosk' 
    });

    if (!result) {
      return res.status(400).json({ message: 'Payment processing failed' });
    }

    res.json({
      message: 'Payment received successfully',
      transaction: toTransactionApi(result)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
