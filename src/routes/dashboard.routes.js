const express = require('express');
const { listAllTransactions } = require('../data/repositories/transactions.repo');

const router = express.Router();

router.get('/overview', async (req, res, next) => {
  try {
    const transactions = await listAllTransactions();
    const paid = transactions.filter((item) => item.payment.status === 'paid');
    const unpaid = transactions.filter((item) => item.payment.status !== 'paid');
    const cancelled = transactions.filter((item) => item.status === 'cancelled');
    const totalRevenue = paid.reduce((sum, item) => sum + Number(item.netAmount || 0), 0);

    res.json({
      filters: {
        startDate: req.query.start_date || null,
        endDate: req.query.end_date || null,
        branchId: req.query.branch_id || null
      },
      summaryCards: {
        totalBills: transactions.length,
        paidBills: paid.length,
        unpaidBills: unpaid.length,
        cancelledBills: cancelled.length,
        todayRevenue: totalRevenue,
        monthlyRevenue: totalRevenue
      },
      paymentChannels: ['cash', 'qr', 'transfer'].map((code) => {
        const filtered = paid.filter((item) => item.payment.method === code);
        return {
          code,
          label: code === 'cash' ? 'เงินสด' : code === 'qr' ? 'QR Payment' : 'โอนเงิน',
          amount: filtered.reduce((sum, item) => sum + Number(item.netAmount || 0), 0),
          count: filtered.length
        };
      }),
      serviceTypes: ['parking', 'ev', 'booking'].map((code) => {
        const filtered = paid.filter((item) => item.serviceType === code);
        return {
          code,
          label: code === 'parking' ? 'ค่าจอดรถ' : code === 'ev' ? 'EV Charge' : 'ค่าจอง',
          amount: filtered.reduce((sum, item) => sum + Number(item.netAmount || 0), 0),
          count: filtered.length
        };
      }),
      revenueTrend: [
        { date: '2026-04-14', amount: 18000 },
        { date: '2026-04-15', amount: 24000 },
        { date: '2026-04-16', amount: totalRevenue }
      ],
      latestTransactions: transactions
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 10)
        .map((item) => ({
          id: item.id,
          billNo: item.billNo,
          plateNo: item.plateNo,
          amount: item.netAmount,
          paymentMethod: item.payment.method,
          paymentStatus: item.payment.status,
          status: item.status,
          paidAt: item.payment.paidAt
        }))
    });
  } catch (err) {
    next(err);
  }
});

router.get('/revenue-overall', async (req, res, next) => {
  try {
    const transactions = await listAllTransactions();
    const paid = transactions.filter((item) => item.payment.status === 'paid');
    const parkingRevenue = paid.filter((item) => item.serviceType === 'parking').reduce((sum, item) => sum + Number(item.netAmount || 0), 0);
    const evRevenue = paid.filter((item) => item.serviceType === 'ev').reduce((sum, item) => sum + Number(item.netAmount || 0), 0);
    const bookingRevenue = paid.filter((item) => item.serviceType === 'booking').reduce((sum, item) => sum + Number(item.netAmount || 0), 0);
    const totalRevenue = parkingRevenue + evRevenue + bookingRevenue;

    res.json({
      summary: {
        totalRevenue,
        parkingRevenue,
        evRevenue,
        bookingRevenue
      },
      revenueByPeriod: {
        daily: [
          { date: '2026-04-14', amount: 18000 },
          { date: '2026-04-15', amount: 24000 },
          { date: '2026-04-16', amount: totalRevenue }
        ],
        monthly: [
          { month: '2026-02', amount: 380000 },
          { month: '2026-03', amount: 420000 },
          { month: '2026-04', amount: totalRevenue }
        ]
      },
      revenueByPaymentChannel: ['cash', 'qr', 'transfer'].map((code) => {
        const filtered = paid.filter((item) => item.payment.method === code);
        return {
          code,
          label: code === 'cash' ? 'เงินสด' : code === 'qr' ? 'QR Payment' : 'โอนเงิน',
          amount: filtered.reduce((sum, item) => sum + Number(item.netAmount || 0), 0)
        };
      }),
      revenueByServiceType: [
        { code: 'parking', label: 'ค่าจอดรถ', amount: parkingRevenue },
        { code: 'ev', label: 'EV Charge', amount: evRevenue },
        { code: 'booking', label: 'ค่าจอง', amount: bookingRevenue }
      ],
      topServices: [
        { serviceCode: 'parking', serviceName: 'ค่าจอดรถรายชั่วโมง', amount: parkingRevenue },
        { serviceCode: 'ev', serviceName: 'EV Charge', amount: evRevenue }
      ]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
