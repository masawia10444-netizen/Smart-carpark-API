const express = require('express');
const { listAllTransactions } = require('../data/repositories/transactions.repo');
const { store } = require('../data/store');

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Dashboard is STRICTLY Real-time Today
    const startDate = startOfToday.toISOString();
    const endDate = now.toISOString();

    const transactionsRaw = await listAllTransactions({ startDate, endDate });
    const currentUserId = req.user?.id || 'u1';

    const dailyTransactions = transactionsRaw.filter(t => !t.isOverstay);
    const paidToday = dailyTransactions.filter((t) => t.payment.status === 'paid');
    const unpaidToday = dailyTransactions.filter((t) => t.payment.status !== 'paid' && t.status !== 'cancelled');
    
    const totalRevenueToday = paidToday.reduce((sum, t) => sum + (t.netAmount || 0), 0);

    // Middle Section: Revenue Groups (Staff vs Scan)
    const cashierPayments = paidToday.flatMap(t => t.payments || []).filter(p => p.channel === 'cashier');
    const totalCashToday = cashierPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const myCashToday = cashierPayments
      .filter((p) => p.processedBy === currentUserId)
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const epayPayments = paidToday.flatMap(t => t.payments || []).filter(p => p.channel !== 'cashier');
    const totalEpayToday = epayPayments.reduce((sum, p) => sum + (p.amount || 0), 0);


    const revenueGroups = [
      { id: 'staff', label: 'เจ้าหน้าที่ช่วยเหลือ', amount: totalCashToday, personalAmount: myCashToday, percent: totalCashToday > 0 ? Math.round((myCashToday / totalCashToday) * 100) : 0 },
      { id: 'scan', label: 'สแกนจ่าย', amount: totalEpayToday, percent: totalRevenueToday > 0 ? Math.round((totalEpayToday / totalRevenueToday) * 100) : 0 }
    ];

    // Bottom Section: 4 Channel Tags
    const channels = [
      { code: 'cashier', label: 'แคเชียร์', subLabel: 'เจ้าหน้าที่หน้างานช่วยเหลือ', icon: 'user' },
      { code: 'mobile', label: 'พร้อมเพย์', subLabel: 'Mobile App & QR Code', icon: 'qr' },
      { code: 'kiosk', label: 'Kiosk', subLabel: 'สถานีบริการด้วยตัวเอง', icon: 'kiosk' },
      { code: 'gate', label: 'หน้าทางออก', subLabel: 'การชำระเงินผ่านประตูอัตโนมัติ', icon: 'gate' }
    ];

    const channelBreakdown = channels.map((ch) => {
      const filteredPayments = paidToday.flatMap(t => t.payments || []).filter(p => p.channel === ch.code);
      const amount = filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
      return {
        ...ch,
        amount,
        count: filteredPayments.length,
        percent: totalRevenueToday > 0 ? Math.round((amount / totalRevenueToday) * 100) : 0
      };
    });


    res.json({
      summaryCards: {
        totalTickets: dailyTransactions.length,
        paidCount: paidToday.length,
        paidRevenue: totalRevenueToday,
        pendingCount: unpaidToday.length,
        avgWaitTime: '12 min'
      },
      revenueGroups,
      channelBreakdown,
      isRealtime: true
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
