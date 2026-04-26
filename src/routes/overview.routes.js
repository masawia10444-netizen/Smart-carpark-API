const express = require('express');
const { listAllTransactions } = require('../data/repositories/transactions.repo');
const { authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authorize(['super_admin', 'staff'], 'overview'));

/**
 * GET /api/v1/overview/summary
 * หน้าแสดงยอดรวมวิเคราะห์เชิงสถิติ (Grand Totals Page - Image 2)
 */
router.get('/summary', async (req, res, next) => {
  try {
    // 1. Setup Time Range (From query or default)
    const now = new Date();
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1); // Default to start of current month (Month-to-Date)

    
    const startDate = req.query.start_date || defaultStart.toISOString();
    const endDate = req.query.end_date || now.toISOString();

    const transactions = await listAllTransactions({ startDate, endDate });

    // 2. Summary Cards (Analytical Period)
    const dailyTransactions = transactions.filter(t => !t.isOverstay);
    const paidList = transactions.filter((t) => (t.totalPaid || 0) >= (t.netAmount || 0));
    const unpaidList = transactions.filter((t) => (t.totalPaid || 0) < (t.netAmount || 0) && t.status !== 'cancelled');

    
    const totalRevenue = paidList.reduce((sum, t) => sum + (t.netAmount || 0), 0);

    // 3. Middle Section: Revenue Groups (%)
    const allRecentPayments = paidList.flatMap(t => t.payments || []);
    const cashTotal = allRecentPayments.filter((p) => p.channel === 'cashier').reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    const epayTotal = allRecentPayments.filter((p) => p.channel !== 'cashier').reduce((sum, p) => sum + (p.paidAmount || 0), 0);


    const revenueGroups = [
      { id: 'staff', label: 'เจ้าหน้าที่ช่วยเหลือ', amount: cashTotal, percent: totalRevenue > 0 ? Math.round((cashTotal / totalRevenue) * 100) : 0 },
      { id: 'scan', label: 'สแกนจ่าย', amount: epayTotal, percent: totalRevenue > 0 ? Math.round((epayTotal / totalRevenue) * 100) : 0 }
    ];

    // 4. Dynamic Usage Timeline (Option 2: Time-based)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    let usageChart = [];

    if (diffDays <= 21) {
      // Group by DAY
      for (let i = 0; i < diffDays; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        const label = `${d.getDate()}/${d.getMonth() + 1}`;
        const count = dailyTransactions.filter(t => {
          const tDate = new Date(t.entryAt);
          return tDate.getDate() === d.getDate() && tDate.getMonth() === d.getMonth();
        }).length;
        usageChart.push({ label, value: count });
      }
    } else if (diffDays <= 90) {
      // Group by WEEK
      const weeksCount = Math.ceil(diffDays / 7);
      for (let i = 0; i < weeksCount; i++) {
        const wStart = new Date(start);
        wStart.setDate(wStart.getDate() + (i * 7));
        const wEnd = new Date(wStart);
        wEnd.setDate(wEnd.getDate() + 6);
        const label = `${wStart.getDate()}/${wStart.getMonth() + 1}`;
        const count = dailyTransactions.filter(t => {
          const tDate = new Date(t.entryAt);
          return tDate >= wStart && tDate <= wEnd;
        }).length;
        usageChart.push({ label: `สัปดาห์ ${i + 1} (${label})`, value: count });
      }
    } else {
      // Group by MONTH
      let current = new Date(start.getFullYear(), start.getMonth(), 1);
      const monthsTh = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      while (current <= end) {
        const label = `${monthsTh[current.getMonth()]} ${current.getFullYear() + 543}`;
        const mStart = new Date(current.getFullYear(), current.getMonth(), 1);
        const mEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
        const count = dailyTransactions.filter(t => {
          const tDate = new Date(t.entryAt);
          return tDate >= mStart && tDate <= mEnd;
        }).length;
        usageChart.push({ label, value: count });
        current.setMonth(current.getMonth() + 1);
      }
    }


    // 5. Revenue by Service Type (Right Panel)
    const serviceSummary = [
        { id: 'cashier', label: 'เงินสด (Cashier)', amount: cashTotal, count: allRecentPayments.filter(p => p.channel === 'cashier').length, percent: totalRevenue > 0 ? Math.round((cashTotal / totalRevenue) * 100) : 0, icon: 'cash' },
        { id: 'epayment', label: 'E-payment', amount: epayTotal, count: allRecentPayments.filter(p => p.channel !== 'cashier').length, percent: totalRevenue > 0 ? Math.round((epayTotal / totalRevenue) * 100) : 0, icon: 'qr' },
        { id: 'kiosk', label: 'Kiosk', amount: allRecentPayments.filter(p => p.channel === 'kiosk').reduce((s, p) => s + (p.paidAmount || 0), 0), count: allRecentPayments.filter(p => p.channel === 'kiosk').length, percent: 12, icon: 'kiosk' }, 
        { id: 'gate', label: 'หน้าทางออก', amount: allRecentPayments.filter(p => p.channel === 'gate').reduce((s, p) => s + (p.paidAmount || 0), 0), count: allRecentPayments.filter(p => p.channel === 'gate').length, percent: 4, icon: 'gate' }
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
