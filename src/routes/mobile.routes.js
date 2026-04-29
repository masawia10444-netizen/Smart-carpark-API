const express = require('express');
const { getTransactionById, processPayment, toTransactionApi } = require('../data/repositories/transactions.repo');

const router = express.Router();

/**
 * 📄 Mobile Transaction Details
 * ดูรายละเอียดและยอดเงินปัจจุบันของรถคันนั้นๆ (สำหรับหน้าเว็บสแกนจ่ายเงินบนมือถือลูกค้า)
 */
router.get('/transaction/:id', async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // ห้ามดูข้อมูลรถที่ออกไปแล้วผ่านช่องทาง Mobile เพื่อความเป็นส่วนตัว
    if (transaction.status === 'completed' || transaction.status === 'cancelled') {
      return res.status(403).json({ message: 'This transaction is already processed' });
    }

    res.json(toTransactionApi(transaction));
  } catch (err) {
    next(err);
  }
});

/**
 * 💰 Mobile Payment API
 * บันทึกการชำระเงินจากมือถือลูกค้า (E-Payment)
 */
router.post('/payment', async (req, res, next) => {
  try {
    const { transactionId, method, amount } = req.body;

    // บันทึกการจ่ายเงิน โดยระบุช่องทางเป็น 'mobile' อัตโนมัติ
    const result = await processPayment(transactionId, {
      method: method || 'epay', // ปกติจ่ายผ่านมือถือมักจะเป็น PromptPay/E-Pay
      channel: 'mobile',
      amount: amount,
      processedBy: 'mobile_web' // ระบุชัดเจนว่าลูกค้าทำรายการเองผ่านเว็บมือถือ
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
