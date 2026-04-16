-- Smart Carpark API - Supabase seed data (optional)
-- Run after `supabase/schema.sql` if you want the same default mock data as `src/data/store.js`.

insert into public.users (id, username, password, name, email, role, permissions, status)
values
  ('u1', 'admin', '123456', 'Admin Parking', 'admin@example.com', 'super_admin', array['dashboard.view','transaction.manage','setting.manage','user.manage'], 'active'),
  ('u2', 'cashier', '123456', 'Cashier One', 'cashier@example.com', 'cashier', array['dashboard.view','transaction.manage'], 'active')
on conflict (id) do update
set
  username = excluded.username,
  password = excluded.password,
  name = excluded.name,
  email = excluded.email,
  role = excluded.role,
  permissions = excluded.permissions,
  status = excluded.status;

insert into public.transactions (
  id,
  bill_no,
  plate_no,
  vehicle_type,
  service_type,
  entry_at,
  exit_at,
  duration_minute,
  amount,
  vat,
  discount,
  net_amount,
  status,
  payment,
  receipt
)
values
  (
    't1',
    'PK202604160001',
    'กข1234',
    'car',
    'parking',
    '2026-04-16T08:00:00+07:00',
    '2026-04-16T10:00:00+07:00',
    120,
    50,
    0,
    0,
    50,
    'completed',
    '{"status":"paid","method":"cash","paidAt":"2026-04-16T10:01:00+07:00","qrCodeText":null,"qrCodeImageUrl":null,"referenceNo":"CASH-0001"}'::jsonb,
    '{"receiptNo":"RCP-0001","issuedAt":"2026-04-16T10:01:00+07:00","footerText":"ขอบคุณที่ใช้บริการ","printableText":"Smart Carpark\nReceipt No: RCP-0001\nBill: PK202604160001\nPlate: กข1234\nAmount: 50 THB"}'::jsonb
  ),
  (
    't2',
    'PK202604160002',
    '1กข5678',
    'car',
    'ev',
    '2026-04-16T11:00:00+07:00',
    '2026-04-16T12:30:00+07:00',
    90,
    120,
    0,
    0,
    120,
    'pending',
    '{"status":"unpaid","method":null,"paidAt":null,"qrCodeText":null,"qrCodeImageUrl":null,"referenceNo":null}'::jsonb,
    '{"receiptNo":null,"issuedAt":null,"footerText":"ขอบคุณที่ใช้บริการ","printableText":null}'::jsonb
  )
on conflict (id) do update
set
  bill_no = excluded.bill_no,
  plate_no = excluded.plate_no,
  vehicle_type = excluded.vehicle_type,
  service_type = excluded.service_type,
  entry_at = excluded.entry_at,
  exit_at = excluded.exit_at,
  duration_minute = excluded.duration_minute,
  amount = excluded.amount,
  vat = excluded.vat,
  discount = excluded.discount,
  net_amount = excluded.net_amount,
  status = excluded.status,
  payment = excluded.payment,
  receipt = excluded.receipt;

insert into public.app_config (key, data)
values
  (
    'pricing_config',
    '{
      "pricingRules": [
        { "id": "pr1", "serviceType": "parking", "vehicleType": "car", "hourStart": 1, "hourEnd": 2, "price": 20, "status": "active" },
        { "id": "pr2", "serviceType": "parking", "vehicleType": "car", "hourStart": 3, "hourEnd": 5, "price": 50, "status": "active" },
        { "id": "pr3", "serviceType": "ev", "vehicleType": "car", "hourStart": 1, "hourEnd": 2, "price": 60, "status": "active" }
      ],
      "paymentChannels": [
        { "code": "cash", "label": "เงินสด", "enabled": true },
        { "code": "qr", "label": "QR Payment", "enabled": true },
        { "code": "transfer", "label": "โอนเงิน", "enabled": false }
      ],
      "serviceChannelMapping": [
        { "serviceType": "parking", "channelCodes": ["cash", "qr"] },
        { "serviceType": "ev", "channelCodes": ["qr"] },
        { "serviceType": "booking", "channelCodes": ["qr", "transfer"] }
      ],
      "masterData": {
        "serviceTypes": [
          { "code": "parking", "label": "ค่าจอดรถ" },
          { "code": "ev", "label": "EV Charge" },
          { "code": "booking", "label": "ค่าจอง" }
        ],
        "vehicleTypes": [
          { "code": "car", "label": "รถยนต์" },
          { "code": "motorcycle", "label": "รถจักรยานยนต์" }
        ]
      }
    }'::jsonb
  ),
  (
    'devices',
    '{
      "summary": { "totalDevices": 2, "online": 1, "offline": 1 },
      "devices": [
        {
          "id": "d1",
          "deviceCode": "PRN001",
          "deviceName": "Printer Counter 1",
          "deviceType": "printer",
          "connectionType": "usb",
          "ipAddress": null,
          "status": "active",
          "isOnline": true,
          "note": "เครื่องพิมพ์หน้าเคาน์เตอร์"
        },
        {
          "id": "d2",
          "deviceCode": "LPR001",
          "deviceName": "LPR Gate 1",
          "deviceType": "lpr",
          "connectionType": "lan",
          "ipAddress": "192.168.1.99",
          "status": "active",
          "isOnline": false,
          "note": "กล้องอ่านป้ายทะเบียนทางเข้า"
        }
      ],
      "masterData": {
        "deviceTypes": [
          { "code": "printer", "label": "เครื่องพิมพ์" },
          { "code": "lpr", "label": "กล้อง LPR" },
          { "code": "barrier", "label": "ไม้กั้น" }
        ],
        "connectionTypes": [
          { "code": "usb", "label": "USB" },
          { "code": "lan", "label": "LAN" },
          { "code": "wifi", "label": "Wi-Fi" }
        ]
      }
    }'::jsonb
  ),
  (
    'theme',
    '{
      "themeName": "default",
      "primaryColor": "#1D4ED8",
      "secondaryColor": "#0F172A",
      "accentColor": "#22C55E",
      "logoUrl": null,
      "updatedAt": "2026-04-16T00:00:00+07:00"
    }'::jsonb
  ),
  (
    'system_settings',
    '{
      "general": { "systemName": "Smart Carpark", "language": "th", "timezone": "Asia/Bangkok" },
      "receipt": {
        "paperWidth": "80mm",
        "fontSize": 12,
        "marginTop": 4,
        "marginBottom": 4,
        "showQr": true,
        "showBillNo": true,
        "showExpiredTime": true,
        "footerText": "ขอบคุณที่ใช้บริการ"
      },
      "billing": { "taxEnabled": false, "currency": "THB", "roundingMode": "normal" },
      "updatedAt": "2026-04-16T00:00:00+07:00"
    }'::jsonb
  )
on conflict (key) do update
set data = excluded.data;
