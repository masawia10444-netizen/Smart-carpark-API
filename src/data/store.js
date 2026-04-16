const { v4: uuidv4 } = require('uuid');

const nowIso = new Date().toISOString();

const store = {
  sessions: {},
  users: [
    {
      id: 'u1',
      username: 'admin',
      password: '123456',
      name: 'Admin Parking',
      email: 'admin@example.com',
      role: 'super_admin',
      permissions: ['dashboard.view', 'transaction.manage', 'setting.manage', 'user.manage'],
      status: 'active',
      createdAt: nowIso,
      updatedAt: nowIso
    },
    {
      id: 'u2',
      username: 'cashier',
      password: '123456',
      name: 'Cashier One',
      email: 'cashier@example.com',
      role: 'cashier',
      permissions: ['dashboard.view', 'transaction.manage'],
      status: 'active',
      createdAt: nowIso,
      updatedAt: nowIso
    }
  ],
  transactions: [
    {
      id: 't1',
      billNo: 'PK202604160001',
      plateNo: 'กข1234',
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt: '2026-04-16T08:00:00+07:00',
      exitAt: '2026-04-16T10:00:00+07:00',
      durationMinute: 120,
      amount: 50,
      vat: 0,
      discount: 0,
      netAmount: 50,
      status: 'completed',
      payment: {
        status: 'paid',
        method: 'cash',
        paidAt: '2026-04-16T10:01:00+07:00',
        qrCodeText: null,
        qrCodeImageUrl: null,
        referenceNo: 'CASH-0001'
      },
      receipt: {
        receiptNo: 'RCP-0001',
        issuedAt: '2026-04-16T10:01:00+07:00',
        footerText: 'ขอบคุณที่ใช้บริการ',
        printableText: 'Smart Carpark\nReceipt No: RCP-0001\nBill: PK202604160001\nPlate: กข1234\nAmount: 50 THB'
      },
      createdAt: nowIso,
      updatedAt: nowIso
    },
    {
      id: 't2',
      billNo: 'PK202604160002',
      plateNo: '1กข5678',
      vehicleType: 'car',
      serviceType: 'ev',
      entryAt: '2026-04-16T11:00:00+07:00',
      exitAt: '2026-04-16T12:30:00+07:00',
      durationMinute: 90,
      amount: 120,
      vat: 0,
      discount: 0,
      netAmount: 120,
      status: 'pending',
      payment: {
        status: 'unpaid',
        method: null,
        paidAt: null,
        qrCodeText: null,
        qrCodeImageUrl: null,
        referenceNo: null
      },
      receipt: {
        receiptNo: null,
        issuedAt: null,
        footerText: 'ขอบคุณที่ใช้บริการ',
        printableText: null
      },
      createdAt: nowIso,
      updatedAt: nowIso
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
