const { v4: uuidv4 } = require('uuid');

const nowIso = new Date().toISOString();

const store = {
  "sessions": {},
  "users": [
    {
      "id": "u1",
      "username": "admin1",
      "password": "123",
      "name": "Admin One",
      "email": "admin1@example.com",
      "role": "super_admin",
      "permissions": [
        "dashboard",
        "transactions",
        "overview",
        "pricing",
        "devices",
        "theme",
        "settings"
      ],
      "status": "active",
      "createdAt": "2026-04-23T10:24:56.405Z",
      "updatedAt": "2026-04-23T10:24:56.405Z"
    },
    {
      "id": "u2",
      "username": "admin2",
      "password": "123",
      "name": "Admin Two",
      "email": "admin2@example.com",
      "role": "staff",
      "permissions": [
        "dashboard",
        "transactions"
      ],
      "status": "active",
      "createdAt": "2026-04-23T10:24:56.405Z",
      "updatedAt": "2026-04-23T10:24:56.405Z"
    },
    {
      "id": "u3",
      "username": "admin3",
      "password": "123",
      "name": "Admin Three",
      "email": "admin3@example.com",
      "role": "staff",
      "permissions": [
        "dashboard",
        "transactions"
      ],
      "status": "active",
      "createdAt": "2026-04-23T10:24:56.405Z",
      "updatedAt": "2026-04-23T10:24:56.405Z"
    },
    {
      "id": "u4",
      "username": "cashier",
      "password": "123456",
      "name": "Test Cashier",
      "email": "cashier@example.com",
      "role": "staff",
      "permissions": [
        "dashboard",
        "transactions"
      ],
      "status": "active",
      "createdAt": "2026-04-23T10:24:56.405Z",
      "updatedAt": "2026-04-23T10:24:56.405Z"
    },
    {
      "id": "u5",
      "username": "superadmin",
      "password": "123456",
      "name": "Main Super Admin",
      "email": "superadmin@example.com",
      "role": "super_admin",
      "permissions": [
        "dashboard",
        "transactions",
        "overview",
        "pricing",
        "devices",
        "theme",
        "settings"
      ],
      "status": "active",
      "createdAt": "2026-04-23T10:24:56.405Z",
      "updatedAt": "2026-04-23T10:24:56.405Z"
    }
  ],
  "transactions": [
    {
      "id": "today_1",
      "billNo": "PK202604230001",
      "plateNo": "ทน-4383",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:47:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T11:47:00+07:00",
      "updatedAt": "2026-04-23T11:47:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_2",
      "billNo": "PK202604230002",
      "plateNo": "ทน-3739",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:05:00+07:00",
      "exitAt": "2026-04-23T14:20:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T13:05:00+07:00",
      "updatedAt": "2026-04-23T14:20:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_sngh",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-23T14:20:00.000Z",
          "expiryAt": "2026-04-23T14:20:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_3",
      "billNo": "PK202604230003",
      "plateNo": "ทน-9558",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:39:00+07:00",
      "exitAt": "2026-04-23T14:54:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T13:39:00+07:00",
      "updatedAt": "2026-04-23T14:54:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_v5m6",
          "method": "qr",
          "channel": "kiosk",
          "amount": 60,
          "paidAt": "2026-04-23T14:54:00.000Z",
          "expiryAt": "2026-04-23T14:54:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_4",
      "billNo": "PK202604230004",
      "plateNo": "ทน-4462",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:11:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T11:11:00+07:00",
      "updatedAt": "2026-04-23T11:11:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_5",
      "billNo": "PK202604230005",
      "plateNo": "ทน-5162",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:06:00+07:00",
      "exitAt": "2026-04-23T09:21:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T08:06:00+07:00",
      "updatedAt": "2026-04-23T09:21:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_fjcd",
          "method": "qr",
          "channel": "gate",
          "amount": 80,
          "paidAt": "2026-04-23T09:21:00.000Z",
          "expiryAt": "2026-04-23T09:21:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_6",
      "billNo": "PK202604230006",
      "plateNo": "ทน-2489",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T09:41:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T09:41:00+07:00",
      "updatedAt": "2026-04-23T09:41:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_7",
      "billNo": "PK202604230007",
      "plateNo": "ทน-6375",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:35:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T12:35:00+07:00",
      "updatedAt": "2026-04-23T12:35:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_8",
      "billNo": "PK202604230008",
      "plateNo": "ทน-5981",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T10:58:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T10:58:00+07:00",
      "updatedAt": "2026-04-23T10:58:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_9",
      "billNo": "PK202604230009",
      "plateNo": "ทน-2304",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:43:00+07:00",
      "exitAt": "2026-04-23T13:58:00.000Z",
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-04-23T12:43:00+07:00",
      "updatedAt": "2026-04-23T13:58:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_l71f",
          "method": "epay",
          "channel": "mobile",
          "amount": 20,
          "paidAt": "2026-04-23T13:58:00.000Z",
          "expiryAt": "2026-04-23T13:58:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "today_10",
      "billNo": "PK202604230010",
      "plateNo": "ทน-9276",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:53:00+07:00",
      "exitAt": "2026-04-23T09:08:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T08:53:00+07:00",
      "updatedAt": "2026-04-23T09:08:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_2aft",
          "method": "epay",
          "channel": "gate",
          "amount": 60,
          "paidAt": "2026-04-23T09:08:00.000Z",
          "expiryAt": "2026-04-23T09:08:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_11",
      "billNo": "PK202604230011",
      "plateNo": "ทน-7966",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:27:00+07:00",
      "exitAt": "2026-04-23T13:42:00.000Z",
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-23T12:27:00+07:00",
      "updatedAt": "2026-04-23T13:42:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_era0",
          "method": "qr",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-04-23T13:42:00.000Z",
          "expiryAt": "2026-04-23T13:42:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "today_12",
      "billNo": "PK202604230012",
      "plateNo": "ทน-9461",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:19:00+07:00",
      "exitAt": "2026-04-23T13:34:00.000Z",
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-23T12:19:00+07:00",
      "updatedAt": "2026-04-23T13:34:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_z4ak",
          "method": "qr",
          "channel": "gate",
          "amount": 100,
          "paidAt": "2026-04-23T13:34:00.000Z",
          "expiryAt": "2026-04-23T13:34:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "today_13",
      "billNo": "PK202604230013",
      "plateNo": "ทน-5761",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:37:00+07:00",
      "exitAt": null,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-04-23T08:37:00+07:00",
      "updatedAt": "2026-04-23T08:37:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_14",
      "billNo": "PK202604230014",
      "plateNo": "ทน-5111",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:36:00+07:00",
      "exitAt": "2026-04-23T13:51:00.000Z",
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-23T12:36:00+07:00",
      "updatedAt": "2026-04-23T13:51:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_98oj",
          "method": "qr",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-04-23T13:51:00.000Z",
          "expiryAt": "2026-04-23T13:51:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "today_15",
      "billNo": "PK202604230015",
      "plateNo": "ทน-8583",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:29:00+07:00",
      "exitAt": null,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "pending",
      "createdAt": "2026-04-23T12:29:00+07:00",
      "updatedAt": "2026-04-23T12:29:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_16",
      "billNo": "PK202604230016",
      "plateNo": "ทน-6582",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:57:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T11:57:00+07:00",
      "updatedAt": "2026-04-23T11:57:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_17",
      "billNo": "PK202604230017",
      "plateNo": "ทน-9785",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:42:00+07:00",
      "exitAt": "2026-04-23T09:57:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T08:42:00+07:00",
      "updatedAt": "2026-04-23T09:57:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_m2zy",
          "method": "epay",
          "channel": "mobile",
          "amount": 40,
          "paidAt": "2026-04-23T09:57:00.000Z",
          "expiryAt": "2026-04-23T09:57:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_18",
      "billNo": "PK202604230018",
      "plateNo": "ทน-4895",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:33:00+07:00",
      "exitAt": null,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "pending",
      "createdAt": "2026-04-23T11:33:00+07:00",
      "updatedAt": "2026-04-23T11:33:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_19",
      "billNo": "PK202604230019",
      "plateNo": "ทน-3758",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T10:19:00+07:00",
      "exitAt": "2026-04-23T11:34:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T10:19:00+07:00",
      "updatedAt": "2026-04-23T11:34:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_330k",
          "method": "qr",
          "channel": "kiosk",
          "amount": 60,
          "paidAt": "2026-04-23T11:34:00.000Z",
          "expiryAt": "2026-04-23T11:34:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_20",
      "billNo": "PK202604230020",
      "plateNo": "ทน-8455",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T10:47:00+07:00",
      "exitAt": "2026-04-23T11:02:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T10:47:00+07:00",
      "updatedAt": "2026-04-23T11:02:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_spix",
          "method": "epay",
          "channel": "gate",
          "amount": 40,
          "paidAt": "2026-04-23T11:02:00.000Z",
          "expiryAt": "2026-04-23T11:02:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_21",
      "billNo": "PK202604230021",
      "plateNo": "ทน-6049",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:41:00+07:00",
      "exitAt": null,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-04-23T08:41:00+07:00",
      "updatedAt": "2026-04-23T08:41:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_22",
      "billNo": "PK202604230022",
      "plateNo": "ทน-1837",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:58:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T13:58:00+07:00",
      "updatedAt": "2026-04-23T13:58:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_23",
      "billNo": "PK202604230023",
      "plateNo": "ทน-6245",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:20:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T13:20:00+07:00",
      "updatedAt": "2026-04-23T13:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_24",
      "billNo": "PK202604230024",
      "plateNo": "ทน-2314",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:45:00+07:00",
      "exitAt": "2026-04-23T16:00:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T15:45:00+07:00",
      "updatedAt": "2026-04-23T16:00:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_ja52",
          "method": "epay",
          "channel": "gate",
          "amount": 80,
          "paidAt": "2026-04-23T16:00:00.000Z",
          "expiryAt": "2026-04-23T16:00:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_25",
      "billNo": "PK202604230025",
      "plateNo": "ทน-5221",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:25:00+07:00",
      "exitAt": "2026-04-23T09:40:00.000Z",
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-04-23T08:25:00+07:00",
      "updatedAt": "2026-04-23T09:40:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_2153",
          "method": "epay",
          "channel": "kiosk",
          "amount": 20,
          "paidAt": "2026-04-23T09:40:00.000Z",
          "expiryAt": "2026-04-23T09:40:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "today_26",
      "billNo": "PK202604230026",
      "plateNo": "ทน-4791",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:25:00+07:00",
      "exitAt": "2026-04-23T09:40:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T08:25:00+07:00",
      "updatedAt": "2026-04-23T09:40:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_g8iz",
          "method": "epay",
          "channel": "mobile",
          "amount": 60,
          "paidAt": "2026-04-23T09:40:00.000Z",
          "expiryAt": "2026-04-23T09:40:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_27",
      "billNo": "PK202604230027",
      "plateNo": "ทน-7240",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:12:00+07:00",
      "exitAt": "2026-04-23T12:27:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T11:12:00+07:00",
      "updatedAt": "2026-04-23T12:27:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_iumf",
          "method": "epay",
          "channel": "gate",
          "amount": 60,
          "paidAt": "2026-04-23T12:27:00.000Z",
          "expiryAt": "2026-04-23T12:27:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_28",
      "billNo": "PK202604230028",
      "plateNo": "ทน-6662",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:26:00+07:00",
      "exitAt": "2026-04-23T09:41:00.000Z",
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-04-23T08:26:00+07:00",
      "updatedAt": "2026-04-23T09:41:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_f68q",
          "method": "cash",
          "channel": "cashier",
          "amount": 20,
          "paidAt": "2026-04-23T09:41:00.000Z",
          "expiryAt": "2026-04-23T09:41:00.000Z",
          "processedBy": "u4"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "today_29",
      "billNo": "PK202604230029",
      "plateNo": "ทน-7245",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:45:00+07:00",
      "exitAt": "2026-04-23T13:00:00.000Z",
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-23T12:45:00+07:00",
      "updatedAt": "2026-04-23T13:00:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_5qfy",
          "method": "qr",
          "channel": "mobile",
          "amount": 100,
          "paidAt": "2026-04-23T13:00:00.000Z",
          "expiryAt": "2026-04-23T13:00:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "today_30",
      "billNo": "PK202604230030",
      "plateNo": "ทน-5472",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:35:00+07:00",
      "exitAt": null,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-04-23T13:35:00+07:00",
      "updatedAt": "2026-04-23T13:35:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_31",
      "billNo": "PK202604230031",
      "plateNo": "สน-1122",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:10:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T14:10:00+07:00",
      "updatedAt": "2026-04-23T14:10:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_32",
      "billNo": "PK202604230032",
      "plateNo": "รน-4455",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:15:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T14:15:00+07:00",
      "updatedAt": "2026-04-23T14:15:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_33",
      "billNo": "PK202604230033",
      "plateNo": "พพ-7788",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:20:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T14:20:00+07:00",
      "updatedAt": "2026-04-23T14:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_34",
      "billNo": "PK202604230034",
      "plateNo": "มม-3344",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:30:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T14:30:00+07:00",
      "updatedAt": "2026-04-23T14:30:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_35",
      "billNo": "PK202604230035",
      "plateNo": "นน-6677",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:45:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T14:45:00+07:00",
      "updatedAt": "2026-04-23T14:45:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_36",
      "billNo": "PK202604230036",
      "plateNo": "วว-1199",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:00:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:00:00+07:00",
      "updatedAt": "2026-04-23T15:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_37",
      "billNo": "PK202604230037",
      "plateNo": "ศศ-5522",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:10:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:10:00+07:00",
      "updatedAt": "2026-04-23T15:10:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_38",
      "billNo": "PK202604230038",
      "plateNo": "ษษ-8844",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:20:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:20:00+07:00",
      "updatedAt": "2026-04-23T15:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_39",
      "billNo": "PK202604230039",
      "plateNo": "หห-2233",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:30:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:30:00+07:00",
      "updatedAt": "2026-04-23T15:30:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_40",
      "billNo": "PK202604230040",
      "plateNo": "ลล-9966",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:40:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:40:00+07:00",
      "updatedAt": "2026-04-23T15:40:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_41",
      "billNo": "PK202604230041",
      "plateNo": "กก-1111",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:50:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T15:50:00+07:00",
      "updatedAt": "2026-04-23T15:50:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_42",
      "billNo": "PK202604230042",
      "plateNo": "ขข-2222",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:00:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:00:00+07:00",
      "updatedAt": "2026-04-23T16:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_43",
      "billNo": "PK202604230043",
      "plateNo": "คค-3333",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:10:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:10:00+07:00",
      "updatedAt": "2026-04-23T16:10:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_44",
      "billNo": "PK202604230044",
      "plateNo": "งง-4444",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:20:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:20:00+07:00",
      "updatedAt": "2026-04-23T16:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_45",
      "billNo": "PK202604230045",
      "plateNo": "จจ-5555",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:30:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:30:00+07:00",
      "updatedAt": "2026-04-23T16:30:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_46",
      "billNo": "PK202604230046",
      "plateNo": "ฉฉ-6666",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:40:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:40:00+07:00",
      "updatedAt": "2026-04-23T16:40:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_47",
      "billNo": "PK202604230047",
      "plateNo": "ชช-7777",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T16:50:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T16:50:00+07:00",
      "updatedAt": "2026-04-23T16:50:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_48",
      "billNo": "PK202604230048",
      "plateNo": "ญญ-8888",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T17:00:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T17:00:00+07:00",
      "updatedAt": "2026-04-23T17:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_49",
      "billNo": "PK202604230049",
      "plateNo": "ฎฎ-9999",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T17:10:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T17:10:00+07:00",
      "updatedAt": "2026-04-23T17:10:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_50",
      "billNo": "PK202604230050",
      "plateNo": "ณณ-1234",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T17:20:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T17:20:00+07:00",
      "updatedAt": "2026-04-23T17:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_51",
      "billNo": "PK202604230051",
      "plateNo": "ดด-5678",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T17:30:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T17:30:00+07:00",
      "updatedAt": "2026-04-23T17:30:00+07:00",
      "payments": [],
      "totalPaid": 0
    }
  ],
  "parkingStates": [
    {
      "billNo": "PK202604230031",
      "plateNo": "ทน-9697",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:20:00+07:00",
      "exitAt": null,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-23T08:20:00+07:00",
      "updatedAt": "2026-04-23T08:20:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_32",
      "billNo": "PK202604230032",
      "plateNo": "ทน-8154",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T09:09:00+07:00",
      "exitAt": null,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "pending",
      "createdAt": "2026-04-23T09:09:00+07:00",
      "updatedAt": "2026-04-23T09:09:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_33",
      "billNo": "PK202604230033",
      "plateNo": "ทน-3224",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:40:00+07:00",
      "exitAt": "2026-04-23T16:55:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T15:40:00+07:00",
      "updatedAt": "2026-04-23T16:55:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_8r95",
          "method": "cash",
          "channel": "cashier",
          "amount": 60,
          "paidAt": "2026-04-23T16:55:00.000Z",
          "expiryAt": "2026-04-23T16:55:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_34",
      "billNo": "PK202604230034",
      "plateNo": "ทน-7082",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T09:16:00+07:00",
      "exitAt": "2026-04-23T10:31:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T09:16:00+07:00",
      "updatedAt": "2026-04-23T10:31:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_xt21",
          "method": "cash",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-04-23T10:31:00.000Z",
          "expiryAt": "2026-04-23T10:31:00.000Z",
          "processedBy": "u4"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_35",
      "billNo": "PK202604230035",
      "plateNo": "ทน-6877",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:32:00+07:00",
      "exitAt": "2026-04-23T12:47:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T11:32:00+07:00",
      "updatedAt": "2026-04-23T12:47:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_7eok",
          "method": "qr",
          "channel": "kiosk",
          "amount": 40,
          "paidAt": "2026-04-23T12:47:00.000Z",
          "expiryAt": "2026-04-23T12:47:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_36",
      "billNo": "PK202604230036",
      "plateNo": "ทน-7564",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T10:46:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T10:46:00+07:00",
      "updatedAt": "2026-04-23T10:46:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_37",
      "billNo": "PK202604230037",
      "plateNo": "ทน-5318",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:36:00+07:00",
      "exitAt": null,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "pending",
      "createdAt": "2026-04-23T13:36:00+07:00",
      "updatedAt": "2026-04-23T13:36:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_38",
      "billNo": "PK202604230038",
      "plateNo": "ทน-6965",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:16:00+07:00",
      "exitAt": "2026-04-23T14:31:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T13:16:00+07:00",
      "updatedAt": "2026-04-23T14:31:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_8lu4",
          "method": "qr",
          "channel": "gate",
          "amount": 80,
          "paidAt": "2026-04-23T14:31:00.000Z",
          "expiryAt": "2026-04-23T14:31:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_39",
      "billNo": "PK202604230039",
      "plateNo": "ทน-4554",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:34:00+07:00",
      "exitAt": "2026-04-23T14:49:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T13:34:00+07:00",
      "updatedAt": "2026-04-23T14:49:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_0abc",
          "method": "epay",
          "channel": "kiosk",
          "amount": 40,
          "paidAt": "2026-04-23T14:49:00.000Z",
          "expiryAt": "2026-04-23T14:49:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_40",
      "billNo": "PK202604230040",
      "plateNo": "ทน-9335",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:36:00+07:00",
      "exitAt": null,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-04-23T15:36:00+07:00",
      "updatedAt": "2026-04-23T15:36:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_41",
      "billNo": "PK202604230041",
      "plateNo": "ทน-4201",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:49:00+07:00",
      "exitAt": "2026-04-23T14:04:00.000Z",
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-23T13:49:00+07:00",
      "updatedAt": "2026-04-23T14:04:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_7em9",
          "method": "cash",
          "channel": "cashier",
          "amount": 100,
          "paidAt": "2026-04-23T14:04:00.000Z",
          "expiryAt": "2026-04-23T14:04:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "today_42",
      "billNo": "PK202604230042",
      "plateNo": "ทน-5982",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T08:19:00+07:00",
      "exitAt": "2026-04-23T09:34:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T08:19:00+07:00",
      "updatedAt": "2026-04-23T09:34:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_vf9m",
          "method": "qr",
          "channel": "kiosk",
          "amount": 60,
          "paidAt": "2026-04-23T09:34:00.000Z",
          "expiryAt": "2026-04-23T09:34:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_43",
      "billNo": "PK202604230043",
      "plateNo": "ทน-5432",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:12:00+07:00",
      "exitAt": "2026-04-23T13:27:00.000Z",
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-04-23T12:12:00+07:00",
      "updatedAt": "2026-04-23T13:27:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_d5kt",
          "method": "epay",
          "channel": "mobile",
          "amount": 20,
          "paidAt": "2026-04-23T13:27:00.000Z",
          "expiryAt": "2026-04-23T13:27:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "today_44",
      "billNo": "PK202604230044",
      "plateNo": "ทน-4099",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:26:00+07:00",
      "exitAt": "2026-04-23T14:41:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T13:26:00+07:00",
      "updatedAt": "2026-04-23T14:41:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_non6",
          "method": "qr",
          "channel": "mobile",
          "amount": 40,
          "paidAt": "2026-04-23T14:41:00.000Z",
          "expiryAt": "2026-04-23T14:41:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_45",
      "billNo": "PK202604230045",
      "plateNo": "ทน-4226",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T09:52:00+07:00",
      "exitAt": "2026-04-23T10:07:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T09:52:00+07:00",
      "updatedAt": "2026-04-23T10:07:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_lc8m",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-23T10:07:00.000Z",
          "expiryAt": "2026-04-23T10:07:00.000Z",
          "processedBy": "u4"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_46",
      "billNo": "PK202604230046",
      "plateNo": "ทน-9928",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T11:01:00+07:00",
      "exitAt": "2026-04-23T12:16:00.000Z",
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-23T11:01:00+07:00",
      "updatedAt": "2026-04-23T12:16:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_ecur",
          "method": "cash",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-04-23T12:16:00.000Z",
          "expiryAt": "2026-04-23T12:16:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "today_47",
      "billNo": "PK202604230047",
      "plateNo": "ทน-1874",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T14:09:00+07:00",
      "exitAt": "2026-04-23T15:24:00.000Z",
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-23T14:09:00+07:00",
      "updatedAt": "2026-04-23T15:24:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_kyxw",
          "method": "cash",
          "channel": "cashier",
          "amount": 60,
          "paidAt": "2026-04-23T15:24:00.000Z",
          "expiryAt": "2026-04-23T15:24:00.000Z",
          "processedBy": "u4"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "today_48",
      "billNo": "PK202604230048",
      "plateNo": "ทน-7564",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T15:39:00+07:00",
      "exitAt": "2026-04-23T16:54:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T15:39:00+07:00",
      "updatedAt": "2026-04-23T16:54:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_7mkx",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-23T16:54:00.000Z",
          "expiryAt": "2026-04-23T16:54:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "today_49",
      "billNo": "PK202604230049",
      "plateNo": "ทน-7847",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T12:55:00+07:00",
      "exitAt": null,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-04-23T12:55:00+07:00",
      "updatedAt": "2026-04-23T12:55:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "today_50",
      "billNo": "PK202604230050",
      "plateNo": "ทน-1483",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-23T13:09:00+07:00",
      "exitAt": "2026-04-23T14:24:00.000Z",
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-23T13:09:00+07:00",
      "updatedAt": "2026-04-23T14:24:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881925_w0ak",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-23T14:24:00.000Z",
          "expiryAt": "2026-04-23T14:24:00.000Z",
          "processedBy": "u4"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_19",
      "billNo": "PK202602020018",
      "plateNo": "7กง7950",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-02T15:00:00+07:00",
      "exitAt": null,
      "durationMinute": 145,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-02-02T15:00:00+07:00",
      "updatedAt": "2026-02-02T15:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_4",
      "billNo": "PK202602080003",
      "plateNo": "หห2806",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-08T16:00:00+07:00",
      "exitAt": null,
      "durationMinute": 81,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-02-08T16:00:00+07:00",
      "updatedAt": "2026-02-08T16:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_17",
      "billNo": "PK202602100016",
      "plateNo": "1ขค8270",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-10T15:00:00+07:00",
      "exitAt": null,
      "durationMinute": 213,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "pending",
      "createdAt": "2026-02-10T15:00:00+07:00",
      "updatedAt": "2026-02-10T15:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_18",
      "billNo": "PK202602120017",
      "plateNo": "งง9966",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-12T08:00:00+07:00",
      "exitAt": "2026-02-12T02:56:00.000Z",
      "durationMinute": 116,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-02-12T08:00:00+07:00",
      "updatedAt": "2026-02-12T02:56:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_ax11",
          "method": "epay",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-02-12T02:56:00.000Z",
          "expiryAt": "2026-02-12T02:56:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_5",
      "billNo": "PK202602130004",
      "plateNo": "1ขค2228",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-13T12:00:00+07:00",
      "exitAt": "2026-02-13T09:05:00.000Z",
      "durationMinute": 245,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-02-13T12:00:00+07:00",
      "updatedAt": "2026-02-13T09:05:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_ckq2",
          "method": "epay",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-02-13T09:05:00.000Z",
          "expiryAt": "2026-02-13T09:05:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_13",
      "billNo": "PK202602140012",
      "plateNo": "กข8558",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-14T08:00:00+07:00",
      "exitAt": "2026-02-14T02:24:00.000Z",
      "durationMinute": 84,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-02-14T08:00:00+07:00",
      "updatedAt": "2026-02-14T02:24:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_hn4o",
          "method": "epay",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-02-14T02:24:00.000Z",
          "expiryAt": "2026-02-14T02:24:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_12",
      "billNo": "PK202602140011",
      "plateNo": "กข8123",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-14T17:00:00+07:00",
      "exitAt": "2026-02-14T14:11:00.000Z",
      "durationMinute": 251,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-02-14T17:00:00+07:00",
      "updatedAt": "2026-02-14T14:11:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_4amw",
          "method": "epay",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-02-14T14:11:00.000Z",
          "expiryAt": "2026-02-14T14:11:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_15",
      "billNo": "PK202602150014",
      "plateNo": "หห3422",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-15T11:00:00+07:00",
      "exitAt": "2026-02-15T06:43:00.000Z",
      "durationMinute": 163,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-02-15T11:00:00+07:00",
      "updatedAt": "2026-02-15T06:43:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_jybe",
          "method": "epay",
          "channel": "kiosk",
          "amount": 60,
          "paidAt": "2026-02-15T06:43:00.000Z",
          "expiryAt": "2026-02-15T06:43:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_2",
      "billNo": "PK202602170001",
      "plateNo": "สส8594",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-17T08:00:00+07:00",
      "exitAt": "2026-02-17T04:41:00.000Z",
      "durationMinute": 221,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-02-17T08:00:00+07:00",
      "updatedAt": "2026-02-17T04:41:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_p6yg",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-02-17T04:41:00.000Z",
          "expiryAt": "2026-02-17T04:41:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_9",
      "billNo": "PK202602190008",
      "plateNo": "หห1950",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-19T10:00:00+07:00",
      "exitAt": "2026-02-19T06:37:00.000Z",
      "durationMinute": 217,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-02-19T10:00:00+07:00",
      "updatedAt": "2026-02-19T06:37:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_p8p9",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-02-19T06:37:00.000Z",
          "expiryAt": "2026-02-19T06:37:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_7",
      "billNo": "PK202602200006",
      "plateNo": "หห5305",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-20T11:00:00+07:00",
      "exitAt": null,
      "durationMinute": 213,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "pending",
      "createdAt": "2026-02-20T11:00:00+07:00",
      "updatedAt": "2026-02-20T11:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_14",
      "billNo": "PK202602210013",
      "plateNo": "หห6588",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-21T09:00:00+07:00",
      "exitAt": "2026-02-21T02:55:00.000Z",
      "durationMinute": 55,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-02-21T09:00:00+07:00",
      "updatedAt": "2026-02-21T02:55:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_4655",
          "method": "epay",
          "channel": "gate",
          "amount": 20,
          "paidAt": "2026-02-21T02:55:00.000Z",
          "expiryAt": "2026-02-21T02:55:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "tmock_3",
      "billNo": "PK202602210002",
      "plateNo": "สส3146",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-21T15:00:00+07:00",
      "exitAt": "2026-02-21T11:07:00.000Z",
      "durationMinute": 187,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-02-21T15:00:00+07:00",
      "updatedAt": "2026-02-21T11:07:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_thwi",
          "method": "epay",
          "channel": "mobile",
          "amount": 80,
          "paidAt": "2026-02-21T11:07:00.000Z",
          "expiryAt": "2026-02-21T11:07:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_10",
      "billNo": "PK202602220009",
      "plateNo": "งง9697",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-22T10:00:00+07:00",
      "exitAt": "2026-02-22T04:48:00.000Z",
      "durationMinute": 108,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-02-22T10:00:00+07:00",
      "updatedAt": "2026-02-22T04:48:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_qhco",
          "method": "epay",
          "channel": "mobile",
          "amount": 40,
          "paidAt": "2026-02-22T04:48:00.000Z",
          "expiryAt": "2026-02-22T04:48:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_8",
      "billNo": "PK202602220007",
      "plateNo": "กข4952",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-22T16:00:00+07:00",
      "exitAt": "2026-02-22T11:04:00.000Z",
      "durationMinute": 124,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-02-22T16:00:00+07:00",
      "updatedAt": "2026-02-22T11:04:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_fes2",
          "method": "epay",
          "channel": "mobile",
          "amount": 60,
          "paidAt": "2026-02-22T11:04:00.000Z",
          "expiryAt": "2026-02-22T11:04:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_16",
      "billNo": "PK202602250015",
      "plateNo": "กข6107",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-25T12:00:00+07:00",
      "exitAt": "2026-02-25T08:30:00.000Z",
      "durationMinute": 210,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-02-25T12:00:00+07:00",
      "updatedAt": "2026-02-25T08:30:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_9yxa",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-02-25T08:30:00.000Z",
          "expiryAt": "2026-02-25T08:30:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_11",
      "billNo": "PK202602260010",
      "plateNo": "1ขค6849",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-26T16:00:00+07:00",
      "exitAt": "2026-02-26T10:25:00.000Z",
      "durationMinute": 85,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-02-26T16:00:00+07:00",
      "updatedAt": "2026-02-26T10:25:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_50xp",
          "method": "epay",
          "channel": "mobile",
          "amount": 40,
          "paidAt": "2026-02-26T10:25:00.000Z",
          "expiryAt": "2026-02-26T10:25:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_1",
      "billNo": "PK202602280000",
      "plateNo": "7กง6888",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-28T09:00:00+07:00",
      "exitAt": "2026-02-28T06:06:00.000Z",
      "durationMinute": 246,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-02-28T09:00:00+07:00",
      "updatedAt": "2026-02-28T06:06:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_56iz",
          "method": "epay",
          "channel": "mobile",
          "amount": 100,
          "paidAt": "2026-02-28T06:06:00.000Z",
          "expiryAt": "2026-02-28T06:06:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_6",
      "billNo": "PK202602280005",
      "plateNo": "งง3875",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-28T10:00:00+07:00",
      "exitAt": "2026-02-28T07:01:00.000Z",
      "durationMinute": 241,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-02-28T10:00:00+07:00",
      "updatedAt": "2026-02-28T07:01:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_ped3",
          "method": "cash",
          "channel": "cashier",
          "amount": 100,
          "paidAt": "2026-02-28T07:01:00.000Z",
          "expiryAt": "2026-02-28T07:01:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_20",
      "billNo": "PK202602280019",
      "plateNo": "งง7736",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-02-28T17:00:00+07:00",
      "exitAt": "2026-02-28T14:08:00.000Z",
      "durationMinute": 248,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-02-28T17:00:00+07:00",
      "updatedAt": "2026-02-28T14:08:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_7k4f",
          "method": "cash",
          "channel": "gate",
          "amount": 100,
          "paidAt": "2026-02-28T14:08:00.000Z",
          "expiryAt": "2026-02-28T14:08:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_22",
      "billNo": "PK202603040001",
      "plateNo": "1ขค6686",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-04T15:00:00+07:00",
      "exitAt": null,
      "durationMinute": 265,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "pending",
      "createdAt": "2026-03-04T15:00:00+07:00",
      "updatedAt": "2026-03-04T15:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_27",
      "billNo": "PK202603050006",
      "plateNo": "7กง2832",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-05T09:00:00+07:00",
      "exitAt": "2026-03-05T03:32:00.000Z",
      "durationMinute": 92,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-03-05T09:00:00+07:00",
      "updatedAt": "2026-03-05T03:32:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_1scg",
          "method": "cash",
          "channel": "kiosk",
          "amount": 40,
          "paidAt": "2026-03-05T03:32:00.000Z",
          "expiryAt": "2026-03-05T03:32:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_26",
      "billNo": "PK202603110005",
      "plateNo": "กข8302",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-11T09:00:00+07:00",
      "exitAt": "2026-03-11T05:39:00.000Z",
      "durationMinute": 219,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-11T09:00:00+07:00",
      "updatedAt": "2026-03-11T05:39:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_k4z2",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-03-11T05:39:00.000Z",
          "expiryAt": "2026-03-11T05:39:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_24",
      "billNo": "PK202603150003",
      "plateNo": "7กง2169",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-15T10:00:00+07:00",
      "exitAt": "2026-03-15T06:32:00.000Z",
      "durationMinute": 212,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-15T10:00:00+07:00",
      "updatedAt": "2026-03-15T06:32:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_3vrc",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-03-15T06:32:00.000Z",
          "expiryAt": "2026-03-15T06:32:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_32",
      "billNo": "PK202603170011",
      "plateNo": "หห3040",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-17T13:00:00+07:00",
      "exitAt": "2026-03-17T10:02:00.000Z",
      "durationMinute": 242,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-03-17T13:00:00+07:00",
      "updatedAt": "2026-03-17T10:02:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_1qpl",
          "method": "epay",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-03-17T10:02:00.000Z",
          "expiryAt": "2026-03-17T10:02:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_35",
      "billNo": "PK202603180014",
      "plateNo": "สส5504",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-18T12:00:00+07:00",
      "exitAt": "2026-03-18T05:33:00.000Z",
      "durationMinute": 33,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-03-18T12:00:00+07:00",
      "updatedAt": "2026-03-18T05:33:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_iwk8",
          "method": "epay",
          "channel": "cashier",
          "amount": 20,
          "paidAt": "2026-03-18T05:33:00.000Z",
          "expiryAt": "2026-03-18T05:33:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "tmock_40",
      "billNo": "PK202603190019",
      "plateNo": "9กต4257",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-19T09:00:00+07:00",
      "exitAt": null,
      "durationMinute": 265,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "pending",
      "createdAt": "2026-03-19T09:00:00+07:00",
      "updatedAt": "2026-03-19T09:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_25",
      "billNo": "PK202603200004",
      "plateNo": "กข8256",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-20T09:00:00+07:00",
      "exitAt": "2026-03-20T05:52:00.000Z",
      "durationMinute": 232,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-20T09:00:00+07:00",
      "updatedAt": "2026-03-20T05:52:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_5q3m",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-03-20T05:52:00.000Z",
          "expiryAt": "2026-03-20T05:52:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_29",
      "billNo": "PK202603200008",
      "plateNo": "สส7467",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-20T17:00:00+07:00",
      "exitAt": null,
      "durationMinute": 125,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-03-20T17:00:00+07:00",
      "updatedAt": "2026-03-20T17:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_39",
      "billNo": "PK202603210018",
      "plateNo": "งง8549",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-21T12:00:00+07:00",
      "exitAt": "2026-03-21T08:53:00.000Z",
      "durationMinute": 233,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-21T12:00:00+07:00",
      "updatedAt": "2026-03-21T08:53:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_fqej",
          "method": "epay",
          "channel": "gate",
          "amount": 80,
          "paidAt": "2026-03-21T08:53:00.000Z",
          "expiryAt": "2026-03-21T08:53:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_37",
      "billNo": "PK202603220016",
      "plateNo": "9กต2960",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-22T16:00:00+07:00",
      "exitAt": null,
      "durationMinute": 140,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-03-22T16:00:00+07:00",
      "updatedAt": "2026-03-22T16:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_30",
      "billNo": "PK202603230009",
      "plateNo": "กข2588",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-23T14:00:00+07:00",
      "exitAt": "2026-03-23T10:31:00.000Z",
      "durationMinute": 211,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-23T14:00:00+07:00",
      "updatedAt": "2026-03-23T10:31:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_3zzp",
          "method": "epay",
          "channel": "mobile",
          "amount": 80,
          "paidAt": "2026-03-23T10:31:00.000Z",
          "expiryAt": "2026-03-23T10:31:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_36",
      "billNo": "PK202603230015",
      "plateNo": "หห5643",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-23T17:00:00+07:00",
      "exitAt": "2026-03-23T11:52:00.000Z",
      "durationMinute": 112,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-03-23T17:00:00+07:00",
      "updatedAt": "2026-03-23T11:52:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_s66y",
          "method": "cash",
          "channel": "mobile",
          "amount": 40,
          "paidAt": "2026-03-23T11:52:00.000Z",
          "expiryAt": "2026-03-23T11:52:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_21",
      "billNo": "PK202603240000",
      "plateNo": "หห4564",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-24T09:00:00+07:00",
      "exitAt": "2026-03-24T06:14:00.000Z",
      "durationMinute": 254,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-03-24T09:00:00+07:00",
      "updatedAt": "2026-03-24T06:14:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_rvzj",
          "method": "epay",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-03-24T06:14:00.000Z",
          "expiryAt": "2026-03-24T06:14:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_23",
      "billNo": "PK202603240002",
      "plateNo": "กข2325",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-24T17:00:00+07:00",
      "exitAt": "2026-03-24T14:26:00.000Z",
      "durationMinute": 266,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-03-24T17:00:00+07:00",
      "updatedAt": "2026-03-24T14:26:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_nj3c",
          "method": "epay",
          "channel": "kiosk",
          "amount": 100,
          "paidAt": "2026-03-24T14:26:00.000Z",
          "expiryAt": "2026-03-24T14:26:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_28",
      "billNo": "PK202603240007",
      "plateNo": "สส4484",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-24T17:00:00+07:00",
      "exitAt": null,
      "durationMinute": 171,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "pending",
      "createdAt": "2026-03-24T17:00:00+07:00",
      "updatedAt": "2026-03-24T17:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_38",
      "billNo": "PK202603240017",
      "plateNo": "7กง3820",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-24T17:00:00+07:00",
      "exitAt": null,
      "durationMinute": 104,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-03-24T17:00:00+07:00",
      "updatedAt": "2026-03-24T17:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_31",
      "billNo": "PK202603250010",
      "plateNo": "กข8023",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-25T13:00:00+07:00",
      "exitAt": "2026-03-25T09:51:00.000Z",
      "durationMinute": 231,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-03-25T13:00:00+07:00",
      "updatedAt": "2026-03-25T09:51:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_g2cm",
          "method": "cash",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-03-25T09:51:00.000Z",
          "expiryAt": "2026-03-25T09:51:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_34",
      "billNo": "PK202603270013",
      "plateNo": "กข8558",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-27T17:00:00+07:00",
      "exitAt": null,
      "durationMinute": 114,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "pending",
      "createdAt": "2026-03-27T17:00:00+07:00",
      "updatedAt": "2026-03-27T17:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_33",
      "billNo": "PK202603280012",
      "plateNo": "สส5501",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-03-28T16:00:00+07:00",
      "exitAt": "2026-03-28T09:58:00.000Z",
      "durationMinute": 58,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-03-28T16:00:00+07:00",
      "updatedAt": "2026-03-28T09:58:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_tw6p",
          "method": "epay",
          "channel": "gate",
          "amount": 20,
          "paidAt": "2026-03-28T09:58:00.000Z",
          "expiryAt": "2026-03-28T09:58:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "tmock_58",
      "billNo": "PK202604010017",
      "plateNo": "กข6731",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-01T13:00:00+07:00",
      "exitAt": "2026-04-01T08:42:00.000Z",
      "durationMinute": 162,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-01T13:00:00+07:00",
      "updatedAt": "2026-04-01T08:42:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_hub9",
          "method": "epay",
          "channel": "gate",
          "amount": 60,
          "paidAt": "2026-04-01T08:42:00.000Z",
          "expiryAt": "2026-04-01T08:42:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_41",
      "billNo": "PK202604020000",
      "plateNo": "หห6637",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-02T12:00:00+07:00",
      "exitAt": "2026-04-02T08:54:00.000Z",
      "durationMinute": 234,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-02T12:00:00+07:00",
      "updatedAt": "2026-04-02T08:54:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_2hzs",
          "method": "epay",
          "channel": "mobile",
          "amount": 80,
          "paidAt": "2026-04-02T08:54:00.000Z",
          "expiryAt": "2026-04-02T08:54:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_49",
      "billNo": "PK202604040008",
      "plateNo": "7กง8967",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-04T14:00:00+07:00",
      "exitAt": "2026-04-04T08:14:00.000Z",
      "durationMinute": 74,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-04T14:00:00+07:00",
      "updatedAt": "2026-04-04T08:14:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_mz1x",
          "method": "epay",
          "channel": "gate",
          "amount": 40,
          "paidAt": "2026-04-04T08:14:00.000Z",
          "expiryAt": "2026-04-04T08:14:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_47",
      "billNo": "PK202604050006",
      "plateNo": "งง9906",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-05T12:00:00+07:00",
      "exitAt": "2026-04-05T06:53:00.000Z",
      "durationMinute": 113,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-05T12:00:00+07:00",
      "updatedAt": "2026-04-05T06:53:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_m4cp",
          "method": "epay",
          "channel": "gate",
          "amount": 40,
          "paidAt": "2026-04-05T06:53:00.000Z",
          "expiryAt": "2026-04-05T06:53:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_55",
      "billNo": "PK202604050014",
      "plateNo": "7กง6101",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-05T12:00:00+07:00",
      "exitAt": "2026-04-05T06:57:00.000Z",
      "durationMinute": 117,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-05T12:00:00+07:00",
      "updatedAt": "2026-04-05T06:57:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_ty0n",
          "method": "cash",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-04-05T06:57:00.000Z",
          "expiryAt": "2026-04-05T06:57:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_60",
      "billNo": "PK202604060019",
      "plateNo": "1ขค8964",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-06T11:00:00+07:00",
      "exitAt": "2026-04-06T08:29:00.000Z",
      "durationMinute": 269,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-06T11:00:00+07:00",
      "updatedAt": "2026-04-06T08:29:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_z7ug",
          "method": "epay",
          "channel": "gate",
          "amount": 100,
          "paidAt": "2026-04-06T08:29:00.000Z",
          "expiryAt": "2026-04-06T08:29:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_51",
      "billNo": "PK202604060010",
      "plateNo": "สส6857",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-06T17:00:00+07:00",
      "exitAt": "2026-04-06T11:27:00.000Z",
      "durationMinute": 87,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-06T17:00:00+07:00",
      "updatedAt": "2026-04-06T11:27:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_aoau",
          "method": "epay",
          "channel": "gate",
          "amount": 40,
          "paidAt": "2026-04-06T11:27:00.000Z",
          "expiryAt": "2026-04-06T11:27:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_53",
      "billNo": "PK202604080012",
      "plateNo": "1ขค8308",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-08T13:00:00+07:00",
      "exitAt": "2026-04-08T08:42:00.000Z",
      "durationMinute": 162,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-08T13:00:00+07:00",
      "updatedAt": "2026-04-08T08:42:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_2b08",
          "method": "cash",
          "channel": "mobile",
          "amount": 60,
          "paidAt": "2026-04-08T08:42:00.000Z",
          "expiryAt": "2026-04-08T08:42:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_45",
      "billNo": "PK202604100004",
      "plateNo": "7กง3904",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-10T08:00:00+07:00",
      "exitAt": "2026-04-10T04:03:00.000Z",
      "durationMinute": 183,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-10T08:00:00+07:00",
      "updatedAt": "2026-04-10T04:03:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_id2c",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-10T04:03:00.000Z",
          "expiryAt": "2026-04-10T04:03:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_48",
      "billNo": "PK202604110007",
      "plateNo": "สส2818",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-11T11:00:00+07:00",
      "exitAt": "2026-04-11T06:35:00.000Z",
      "durationMinute": 155,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-11T11:00:00+07:00",
      "updatedAt": "2026-04-11T06:35:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_f3v6",
          "method": "epay",
          "channel": "gate",
          "amount": 60,
          "paidAt": "2026-04-11T06:35:00.000Z",
          "expiryAt": "2026-04-11T06:35:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_44",
      "billNo": "PK202604130003",
      "plateNo": "1ขค5739",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-13T09:00:00+07:00",
      "exitAt": "2026-04-13T02:58:00.000Z",
      "durationMinute": 58,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "completed",
      "createdAt": "2026-04-13T09:00:00+07:00",
      "updatedAt": "2026-04-13T02:58:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_dqgv",
          "method": "epay",
          "channel": "cashier",
          "amount": 20,
          "paidAt": "2026-04-13T02:58:00.000Z",
          "expiryAt": "2026-04-13T02:58:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 20
    },
    {
      "id": "tmock_59",
      "billNo": "PK202604130018",
      "plateNo": "1ขค3787",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-13T13:00:00+07:00",
      "exitAt": "2026-04-13T08:48:00.000Z",
      "durationMinute": 168,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-13T13:00:00+07:00",
      "updatedAt": "2026-04-13T08:48:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_ckzt",
          "method": "cash",
          "channel": "cashier",
          "amount": 60,
          "paidAt": "2026-04-13T08:48:00.000Z",
          "expiryAt": "2026-04-13T08:48:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_50",
      "billNo": "PK202604140009",
      "plateNo": "หห9850",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-14T11:00:00+07:00",
      "exitAt": "2026-04-14T07:38:00.000Z",
      "durationMinute": 218,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-14T11:00:00+07:00",
      "updatedAt": "2026-04-14T07:38:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_uc4q",
          "method": "epay",
          "channel": "cashier",
          "amount": 80,
          "paidAt": "2026-04-14T07:38:00.000Z",
          "expiryAt": "2026-04-14T07:38:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_56",
      "billNo": "PK202604160015",
      "plateNo": "9กต9202",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-16T14:00:00+07:00",
      "exitAt": "2026-04-16T08:25:00.000Z",
      "durationMinute": 85,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-16T14:00:00+07:00",
      "updatedAt": "2026-04-16T08:25:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_i1bm",
          "method": "cash",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-04-16T08:25:00.000Z",
          "expiryAt": "2026-04-16T08:25:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_42",
      "billNo": "PK202604170001",
      "plateNo": "กข1935",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-17T09:00:00+07:00",
      "exitAt": "2026-04-17T04:13:00.000Z",
      "durationMinute": 133,
      "amount": 60,
      "vat": 0,
      "discount": 0,
      "netAmount": 60,
      "status": "completed",
      "createdAt": "2026-04-17T09:00:00+07:00",
      "updatedAt": "2026-04-17T04:13:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_kq2j",
          "method": "epay",
          "channel": "kiosk",
          "amount": 60,
          "paidAt": "2026-04-17T04:13:00.000Z",
          "expiryAt": "2026-04-17T04:13:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 60
    },
    {
      "id": "tmock_43",
      "billNo": "PK202604180002",
      "plateNo": "หห3162",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-18T14:00:00+07:00",
      "exitAt": "2026-04-18T11:01:00.000Z",
      "durationMinute": 241,
      "amount": 100,
      "vat": 0,
      "discount": 0,
      "netAmount": 100,
      "status": "completed",
      "createdAt": "2026-04-18T14:00:00+07:00",
      "updatedAt": "2026-04-18T11:01:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_jem9",
          "method": "epay",
          "channel": "gate",
          "amount": 100,
          "paidAt": "2026-04-18T11:01:00.000Z",
          "expiryAt": "2026-04-18T11:01:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 100
    },
    {
      "id": "tmock_54",
      "billNo": "PK202604180013",
      "plateNo": "งง3900",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-18T15:00:00+07:00",
      "exitAt": "2026-04-18T09:16:00.000Z",
      "durationMinute": 76,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-18T15:00:00+07:00",
      "updatedAt": "2026-04-18T09:16:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_l98r",
          "method": "cash",
          "channel": "cashier",
          "amount": 40,
          "paidAt": "2026-04-18T09:16:00.000Z",
          "expiryAt": "2026-04-18T09:16:00.000Z",
          "processedBy": "u3"
        }
      ],
      "totalPaid": 40
    },
    {
      "id": "tmock_46",
      "billNo": "PK202604240005",
      "plateNo": "9กต8458",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-24T15:00:00+07:00",
      "exitAt": "2026-04-24T11:26:00.000Z",
      "durationMinute": 206,
      "amount": 80,
      "vat": 0,
      "discount": 0,
      "netAmount": 80,
      "status": "completed",
      "createdAt": "2026-04-24T15:00:00+07:00",
      "updatedAt": "2026-04-24T11:26:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_9tun",
          "method": "cash",
          "channel": "gate",
          "amount": 80,
          "paidAt": "2026-04-24T11:26:00.000Z",
          "expiryAt": "2026-04-24T11:26:00.000Z",
          "processedBy": "u2"
        }
      ],
      "totalPaid": 80
    },
    {
      "id": "tmock_52",
      "billNo": "PK202604270011",
      "plateNo": "1ขค8034",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-27T12:00:00+07:00",
      "exitAt": null,
      "durationMinute": 46,
      "amount": 20,
      "vat": 0,
      "discount": 0,
      "netAmount": 20,
      "status": "pending",
      "createdAt": "2026-04-27T12:00:00+07:00",
      "updatedAt": "2026-04-27T12:00:00+07:00",
      "payments": [],
      "totalPaid": 0
    },
    {
      "id": "tmock_57",
      "billNo": "PK202604280016",
      "plateNo": "หห4893",
      "vehicleType": "car",
      "serviceType": "parking",
      "entryAt": "2026-04-28T14:00:00+07:00",
      "exitAt": "2026-04-28T08:57:00.000Z",
      "durationMinute": 117,
      "amount": 40,
      "vat": 0,
      "discount": 0,
      "netAmount": 40,
      "status": "completed",
      "createdAt": "2026-04-28T14:00:00+07:00",
      "updatedAt": "2026-04-28T08:57:00.000Z",
      "payments": [
        {
          "id": "pay_1776941881926_0vih",
          "method": "epay",
          "channel": "gate",
          "amount": 40,
          "paidAt": "2026-04-28T08:57:00.000Z",
          "expiryAt": "2026-04-28T08:57:00.000Z",
          "processedBy": "u1"
        }
      ],
      "totalPaid": 40
    }
  ],
  "pricingConfig": {
    "pricingRules": [
      {
        "id": "pr1",
        "serviceType": "parking",
        "vehicleType": "car",
        "hourStart": 1,
        "hourEnd": 2,
        "price": 20,
        "status": "active"
      },
      {
        "id": "pr2",
        "serviceType": "parking",
        "vehicleType": "car",
        "hourStart": 3,
        "hourEnd": 5,
        "price": 50,
        "status": "active"
      },
      {
        "id": "pr3",
        "serviceType": "ev",
        "vehicleType": "car",
        "hourStart": 1,
        "hourEnd": 2,
        "price": 60,
        "status": "active"
      }
    ],
    "paymentChannels": [
      {
        "code": "cash",
        "label": "เงินสด",
        "enabled": true
      },
      {
        "code": "qr",
        "label": "QR Payment",
        "enabled": true
      },
      {
        "code": "transfer",
        "label": "โอนเงิน",
        "enabled": false
      }
    ],
    "serviceChannelMapping": [
      {
        "serviceType": "parking",
        "channelCodes": [
          "cash",
          "qr"
        ]
      },
      {
        "serviceType": "ev",
        "channelCodes": [
          "qr"
        ]
      },
      {
        "serviceType": "booking",
        "channelCodes": [
          "qr",
          "transfer"
        ]
      }
    ],
    "masterData": {
      "serviceTypes": [
        {
          "code": "parking",
          "label": "ค่าจอดรถ"
        },
        {
          "code": "ev",
          "label": "EV Charge"
        },
        {
          "code": "booking",
          "label": "ค่าจอง"
        }
      ],
      "vehicleTypes": [
        {
          "code": "car",
          "label": "รถยนต์"
        },
        {
          "code": "motorcycle",
          "label": "รถจักรยานยนต์"
        }
      ]
    }
  },
  "devices": {
    "summary": {
      "totalDevices": 2,
      "online": 1,
      "offline": 1
    },
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
        {
          "code": "printer",
          "label": "เครื่องพิมพ์"
        },
        {
          "code": "lpr",
          "label": "กล้อง LPR"
        },
        {
          "code": "barrier",
          "label": "ไม้กั้น"
        }
      ],
      "connectionTypes": [
        {
          "code": "usb",
          "label": "USB"
        },
        {
          "code": "lan",
          "label": "LAN"
        },
        {
          "code": "wifi",
          "label": "Wi-Fi"
        }
      ]
    }
  },
  "theme": {
    "themeName": "default",
    "primaryColor": "#1D4ED8",
    "secondaryColor": "#0F172A",
    "accentColor": "#22C55E",
    "logoUrl": null,
    "updatedAt": "2026-04-23T10:24:56.405Z"
  },
  "systemSettings": {
    "general": {
      "systemName": "Smart Carpark",
      "language": "th",
      "timezone": "Asia/Bangkok"
    },
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
    "billing": {
      "taxEnabled": false,
      "currency": "THB",
      "roundingMode": "normal"
    },
    "updatedAt": "2026-04-23T10:24:56.405Z"
  }
};

function createId(prefix) {
  return `${prefix}_${uuidv4().split('-')[0]}`;
}

module.exports = { store, createId };
