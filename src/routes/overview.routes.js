const express = require('express');
const { listAllTransactions } = require('../data/repositories/transactions.repo');

const router = express.Router();

/**
 * GET /api/v1/overview/summary
 * หน้าแสดงยอดรวมวิเคราะห์เชิงสถิติ (Grand Totals Page - Image 2)
 */
router.get('/summary', async (req, res, next) => {
  try {
    // 1. Setup Time Range (From query or default)
    const now = new Date();
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); // Default 7 days
    
    const startDate = req.query.start_date || defaultStart.toISOString();
    const endDate = req.query.end_date || now.toISOString();

    const transactions = await listAllTransactions({ startDate, endDate });

    // 2. Summary Cards (Analytical Period)
    const dailyTransactions = transactions.filter(t => !t.isOverstay);
    const paidList = dailyTransactions.filter((t) => t.payment.status === 'paid');
    const unpaidList = dailyTransactions.filter((t) => t.payment.status !== 'paid' && t.status !== 'cancelled');
    
    const totalRevenue = paidList.reduce((sum, t) => sum + (t.netAmount || 0), 0);

    // 3. Middle Section: Revenue Groups (%)
    const cashTotal = paidList.filter((t) => t.payment.channel === 'cashier').reduce((sum, t) => sum + (t.netAmount || 0), 0);
    const epayTotal = paidList.filter((t) => t.payment.channel !== 'cashier').reduce((sum, t) => sum + (t.netAmount || 0), 0);

    const revenueGroups = [
      { id: 'staff', label: 'เจ้าหน้าที่ช่วยเหลือ', amount: cashTotal, percent: totalRevenue > 0 ? Math.round((cashTotal / totalRevenue) * 100) : 0 },
      { id: 'scan', label: 'สแกนจ่าย', amount: epayTotal, percent: totalRevenue > 0 ? Math.round((epayTotal / totalRevenue) * 100) : 0 }
    ];

    // 4. User Usage Line Chart Data
    const daysTh = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const usageChart = daysTh.map((label, index) => {
        const count = dailyTransactions.filter((t) => {
          const d = new Date(t.entryAt);
          return d.getDay() === index;
        }).length;
        return { label, value: count };
    });

    // 5. Revenue by Service Type (Right Panel)
    const serviceSummary = [
        { id: 'cashier', label: 'เงินสด (Cashier)', amount: cashTotal, count: paidList.filter(t => t.payment.channel === 'cashier').length, percent: totalRevenue > 0 ? Math.round((cashTotal / totalRevenue) * 100) : 0, icon: 'cash' },
        { id: 'epayment', label: 'E-payment', amount: epayTotal, count: paidList.filter(t => t.payment.channel !== 'cashier').length, percent: totalRevenue > 0 ? Math.round((epayTotal / totalRevenue) * 100) : 0, icon: 'qr' },
        { id: 'kiosk', label: 'Kiosk', amount: paidList.filter(t => t.payment.channel === 'kiosk').reduce((s, t) => s + (t.netAmount || 0), 0), count: paidList.filter(t => t.payment.channel === 'kiosk').length, percent: 12, icon: 'kiosk' }, // Mocking some % as per image
        { id: 'gate', label: 'หน้าทางออก', amount: paidList.filter(t => t.payment.channel === 'gate').reduce((s, t) => s + (t.netAmount || 0), 0), count: paidList.filter(t => t.payment.channel === 'gate').length, percent: 4, icon: 'gate' }
    ];

    res.json({
      filters: { startDate, endDate },
      summaryCards: {
        totalTickets: dailyTransactions.length,
        paidCount: paidList.length,
        paidRevenue: totalRevenue,
        pendingCount: unpaidList.length,
        avgWait: '10 min'
      },
      revenueGroups,
      usageChart,
      serviceSummary,
      totalSummaryCalculated: serviceSummary.reduce((s, i) => s + i.amount, 0)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
