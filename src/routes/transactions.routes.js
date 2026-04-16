const express = require('express');
const { listTransactions, getTransactionById, saveTransaction } = require('../data/repositories/transactions.repo');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { keyword, plate_no: plateNo, bill_no: billNo, status, payment_status: paymentStatus, page = 1, per_page = 10 } = req.query;
    const result = await listTransactions({
      keyword,
      plateNo,
      billNo,
      status,
      paymentStatus,
      page,
      perPage: per_page
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.json({
      ...transaction,
      receiptPreview: {
        printableText: transaction.receipt.printableText || `Smart Carpark\nBill: ${transaction.billNo}\nPlate: ${transaction.plateNo}\nAmount: ${transaction.netAmount} THB`,
        canPrint: transaction.payment.status === 'paid'
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/payment', async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const { method, action = 'confirm', referenceNo } = req.body;
    if (!['qr', 'cash', 'transfer'].includes(method)) {
      return res.status(400).json({ message: 'method must be qr, cash, or transfer' });
    }

    if (method === 'qr' && action === 'generate') {
      const qrCodeText = `MOCKQR|${transaction.billNo}|${transaction.netAmount}|${Date.now()}`;
      const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeText)}`;
      transaction.payment.qrCodeText = qrCodeText;
      transaction.payment.qrCodeImageUrl = qrCodeImageUrl;
      transaction.updatedAt = new Date().toISOString();
      await saveTransaction(transaction);

      return res.json({
        message: 'Mock QR generated successfully',
        transactionId: transaction.id,
        amount: transaction.netAmount,
        qrCodeText,
        qrCodeImageUrl,
        expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      });
    }

    transaction.payment = {
      ...transaction.payment,
      status: 'paid',
      method,
      paidAt: new Date().toISOString(),
      referenceNo: referenceNo || `${method.toUpperCase()}-${Date.now()}`
    };
    transaction.status = 'completed';
    transaction.receipt.receiptNo = transaction.receipt.receiptNo || `RCP-${Date.now()}`;
    transaction.receipt.issuedAt = new Date().toISOString();
    transaction.receipt.printableText = `Smart Carpark\nReceipt No: ${transaction.receipt.receiptNo}\nBill: ${transaction.billNo}\nPlate: ${transaction.plateNo}\nAmount: ${transaction.netAmount} THB\nMethod: ${method}`;
    transaction.updatedAt = new Date().toISOString();

    const saved = await saveTransaction(transaction);

    return res.json({
      message: 'Mock payment completed successfully',
      transaction: saved
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const { status } = req.body;
    if (!['pending', 'completed', 'cancelled', 'void'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    transaction.status = status;
    transaction.updatedAt = new Date().toISOString();
    const saved = await saveTransaction(transaction);
    res.json({ message: 'Transaction status updated', transaction: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
