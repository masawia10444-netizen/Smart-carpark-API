const { v4: uuidv4 } = require('uuid');

const nowIso = new Date().toISOString();

const store = {
  sessions: {},
  users: [
    {
      id: 'u1',
      username: 'admin1',
      password: '123',
      name: 'Admin One',
      email: 'admin1@example.com',
      role: 'super_admin',
      permissions: ['dashboard.view', 'transaction.manage', 'setting.manage', 'user.manage'],
      status: 'active',
      createdAt: nowIso,
      updatedAt: nowIso
    },
    {
      id: 'u2',
      username: 'admin2',
      password: '123',
      name: 'Admin Two',
      email: 'admin2@example.com',
      role: 'staff',
      permissions: ['dashboard.view', 'transaction.manage'],
      status: 'active',
      createdAt: nowIso,
      updatedAt: nowIso
    },
    {
      id: 'u3',
      username: 'admin3',
      password: '123',
      name: 'Admin Three',
      email: 'admin3@example.com',
      role: 'staff',
      permissions: ['dashboard.view', 'transaction.manage'],
      status: 'active',
      createdAt: nowIso,
      updatedAt: nowIso
    }
  ],
  transactions: [
    // --- Week 1 (April 6 - 12) ---
    {
      id: 't1',
      billNo: 'PK202604060001',
      plateNo: 'กข1234',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-06T08:00:00+07:00',
      exitAt: '2026-04-06T10:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u1',
        paidAt: '2026-04-06T10:05:00+07:00',
        referenceNo: 'CSH-001'
      },
      receipt: { receiptNo: 'RCP-001', issuedAt: '2026-04-06T10:05:00+07:00' },
      createdAt: '2026-04-06T08:00:00+07:00',
      updatedAt: '2026-04-06T10:05:00+07:00'
    },
    {
      id: 't2',
      billNo: 'PK202604070001',
      plateNo: '2ขค5566',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-07T09:00:00+07:00',
      exitAt: '2026-04-07T11:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'mobile',
        paidAt: '2026-04-07T11:10:00+07:00',
        referenceNo: 'EP-001'
      },
      receipt: { receiptNo: 'RCP-002', issuedAt: '2026-04-07T11:10:00+07:00' },
      createdAt: '2026-04-07T09:00:00+07:00',
      updatedAt: '2026-04-07T11:10:00+07:00'
    },
    {
      id: 't3',
      billNo: 'PK202604080001',
      plateNo: 'หห9999',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-08T13:00:00+07:00',
      exitAt: '2026-04-08T15:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u2',
        paidAt: '2026-04-08T15:05:00+07:00',
        referenceNo: 'CSH-002'
      },
      receipt: { receiptNo: 'RCP-003', issuedAt: '2026-04-08T15:05:00+07:00' },
      createdAt: '2026-04-08T13:00:00+07:00',
      updatedAt: '2026-04-08T15:05:00+07:00'
    },
    // --- Week 2 (April 13 - 19) ---
    {
      id: 't4',
      billNo: 'PK202604130001',
      plateNo: '7กง1111',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-13T10:00:00+07:00',
      exitAt: '2026-04-13T12:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'kiosk',
        paidAt: '2026-04-13T12:05:00+07:00',
        referenceNo: 'KS-001'
      },
      receipt: { receiptNo: 'RCP-004', issuedAt: '2026-04-13T12:05:00+07:00' },
      createdAt: '2026-04-13T10:00:00+07:00',
      updatedAt: '2026-04-13T12:05:00+07:00'
    },
    {
      id: 't5',
      billNo: 'PK202604140001',
      plateNo: 'สส4444',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-14T14:00:00+07:00',
      exitAt: '2026-04-14T16:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'gate',
        paidAt: '2026-04-14T16:05:00+07:00',
        referenceNo: 'GT-001'
      },
      receipt: { receiptNo: 'RCP-005', issuedAt: '2026-04-14T16:05:00+07:00' },
      createdAt: '2026-04-14T14:00:00+07:00',
      updatedAt: '2026-04-14T16:05:00+07:00'
    },
    {
      id: 't6',
      billNo: 'PK202604150001',
      plateNo: 'งง8888',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-15T15:00:00+07:00',
      exitAt: '2026-04-15T17:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u3',
        paidAt: '2026-04-15T17:05:00+07:00',
        referenceNo: 'CSH-003'
      },
      receipt: { receiptNo: 'RCP-006', issuedAt: '2026-04-15T17:05:00+07:00' },
      createdAt: '2026-04-15T15:00:00+07:00',
      updatedAt: '2026-04-15T17:05:00+07:00'
    },
    // --- Current Week (April 20 - 22) ---
    // --- Current Week (April 20 - 22) ---
    {
      id: 't7',
      billNo: 'PK202604200001',
      plateNo: '9กต9900',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-20T10:00:00+07:00',
      exitAt: '2026-04-20T12:00:00+07:00',
      durationMinute: 120,
      amount: 40,
      vat: 0,
      discount: 0,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u1',
        paidAt: '2026-04-20T12:05:00+07:00'
      },
      createdAt: '2026-04-20T10:00:00+07:00',
      updatedAt: '2026-04-20T12:05:00+07:00'
    },
    // --- TODAY (April 22) - Realtime Data ---
    {
      id: 't11',
      billNo: 'PK202604220101',
      plateNo: '1กข1001',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T08:00:00+07:00',
      exitAt: '2026-04-22T09:00:00+07:00',
      durationMinute: 60,
      netAmount: 20,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u1',
        paidAt: '2026-04-22T09:05:00+07:00'
      },
      createdAt: '2026-04-22T08:00:00+07:00',
      updatedAt: '2026-04-22T09:05:00+07:00'
    },
    {
      id: 't12',
      billNo: 'PK202604220102',
      plateNo: '2ขค2002',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T08:30:00+07:00',
      exitAt: '2026-04-22T10:00:00+07:00',
      durationMinute: 90,
      netAmount: 30,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u1', // u1 handles some cash
        paidAt: '2026-04-22T10:05:00+07:00'
      },
      createdAt: '2026-04-22T08:30:00+07:00',
      updatedAt: '2026-04-22T10:05:00+07:00'
    },
    {
      id: 't13',
      billNo: 'PK202604220103',
      plateNo: '3คง3003',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T09:00:00+07:00',
      exitAt: '2026-04-22T11:00:00+07:00',
      durationMinute: 120,
      netAmount: 40,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        channel: 'cashier',
        processedBy: 'u2', // u2 handles some cash
        paidAt: '2026-04-22T11:05:00+07:00'
      },
      createdAt: '2026-04-22T09:00:00+07:00',
      updatedAt: '2026-04-22T11:05:00+07:00'
    },
    {
      id: 't14',
      billNo: 'PK202604220104',
      plateNo: '4จฉ4004',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T09:30:00+07:00',
      exitAt: '2026-04-22T12:00:00+07:00',
      durationMinute: 150,
      netAmount: 50,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'mobile', // Mobile e-pay
        paidAt: '2026-04-22T12:05:00+07:00'
      },
      createdAt: '2026-04-22T09:30:00+07:00',
      updatedAt: '2026-04-22T12:05:00+07:00'
    },
    {
      id: 't15',
      billNo: 'PK202604220105',
      plateNo: '5ชซ5005',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T10:00:00+07:00',
      exitAt: '2026-04-22T11:30:00+07:00',
      durationMinute: 90,
      netAmount: 30,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'kiosk', // Kiosk e-pay
        paidAt: '2026-04-22T11:35:00+07:00'
      }
    },
    {
      id: 't16',
      billNo: 'PK202604220106',
      plateNo: '6ฌญ6006',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T13:00:00+07:00',
      exitAt: '2026-04-22T14:00:00+07:00',
      durationMinute: 60,
      netAmount: 20,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'epay',
        channel: 'gate', // Gate e-pay
        paidAt: '2026-04-22T14:05:00+07:00'
      }
    },
    {
      id: 't17',
      billNo: 'PK202604220107',
      plateNo: '7ฎฏ7007',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-22T14:00:00+07:00',
      status: 'pending',
      payment: { status: 'unpaid' }
    },
    // --- BARRED: Overstay Pending (Not shown in "Daily" but ready in DB) ---
    {
      id: 't18',
      billNo: 'OX202604180001',
      plateNo: 'กข-9999',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-18T10:00:00+07:00', // ~4 days ago
      status: 'pending',
      payment: { status: 'unpaid' }
    },
    {
      id: 't19',
      billNo: 'OX202604120001',
      plateNo: 'สส-1111',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-12T08:00:00+07:00', // ~10 days ago
      status: 'pending',
      payment: { status: 'unpaid' }
    }
  ],
  pricingConfig: {
    pricingRules: [
      { id: 'pr1', serviceType: 'parking', vehicleType: 'car', hourStart: 1, hourEnd: 2, price: 20, status: 'active' },
      { id: 'pr2', serviceType: 'parking', vehicleType: 'car', hourStart: 3, hourEnd: 5, price: 50, status: 'active' },
      { id: 'pr3', serviceType: 'ev', vehicleType: 'car', hourStart: 1, hourEnd: 2, price: 60, status: 'active' }
    ],
    paymentChannels: [
      { code: 'cash', label: 'เงินสด', enabled: true },
      { code: 'qr', label: 'QR Payment', enabled: true },
      { code: 'transfer', label: 'โอนเงิน', enabled: false }
    ],
    serviceChannelMapping: [
      { serviceType: 'parking', channelCodes: ['cash', 'qr'] },
      { serviceType: 'ev', channelCodes: ['qr'] },
      { serviceType: 'booking', channelCodes: ['qr', 'transfer'] }
    ],
    masterData: {
      serviceTypes: [
        { code: 'parking', label: 'ค่าจอดรถ' },
        { code: 'ev', label: 'EV Charge' },
        { code: 'booking', label: 'ค่าจอง' }
      ],
      vehicleTypes: [
        { code: 'car', label: 'รถยนต์' },
        { code: 'motorcycle', label: 'รถจักรยานยนต์' }
      ]
    }
  },
  devices: {
    summary: { totalDevices: 2, online: 1, offline: 1 },
    devices: [
      {
        id: 'd1',
        deviceCode: 'PRN001',
        deviceName: 'Printer Counter 1',
        deviceType: 'printer',
        connectionType: 'usb',
        ipAddress: null,
        status: 'active',
        isOnline: true,
        note: 'เครื่องพิมพ์หน้าเคาน์เตอร์'
      },
      {
        id: 'd2',
        deviceCode: 'LPR001',
        deviceName: 'LPR Gate 1',
        deviceType: 'lpr',
        connectionType: 'lan',
        ipAddress: '192.168.1.99',
        status: 'active',
        isOnline: false,
        note: 'กล้องอ่านป้ายทะเบียนทางเข้า'
      }
    ],
    masterData: {
      deviceTypes: [
        { code: 'printer', label: 'เครื่องพิมพ์' },
        { code: 'lpr', label: 'กล้อง LPR' },
        { code: 'barrier', label: 'ไม้กั้น' }
      ],
      connectionTypes: [
        { code: 'usb', label: 'USB' },
        { code: 'lan', label: 'LAN' },
        { code: 'wifi', label: 'Wi-Fi' }
      ]
    }
  },
  theme: {
    themeName: 'default',
    primaryColor: '#1D4ED8',
    secondaryColor: '#0F172A',
    accentColor: '#22C55E',
    logoUrl: null,
    updatedAt: nowIso
  },
  systemSettings: {
    general: {
      systemName: 'Smart Carpark',
      language: 'th',
      timezone: 'Asia/Bangkok'
    },
    receipt: {
      paperWidth: '80mm',
      fontSize: 12,
      marginTop: 4,
      marginBottom: 4,
      showQr: true,
      showBillNo: true,
      showExpiredTime: true,
      footerText: 'ขอบคุณที่ใช้บริการ'
    },
    billing: {
      taxEnabled: false,
      currency: 'THB',
      roundingMode: 'normal'
    },
    updatedAt: nowIso
  }
};

function createId(prefix = 'id') {
  return `${prefix}_${uuidv4().replace(/-/g, '').slice(0, 10)}`;
}

module.exports = {
  store,
  createId
};
