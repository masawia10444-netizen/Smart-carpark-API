# Smart Carpark API (Mock Backend)

โปรเจกต์นี้เป็น Node.js + Express mock backend สำหรับระบบ Smart Carpark ฝั่ง admin โดยเน้นให้พร้อมใช้สำหรับการพัฒนา frontend หรือใช้เป็นต้นแบบ backend ก่อนเชื่อมฐานข้อมูลและ payment จริง

## คุณสมบัติ
- Node.js + Express
- Mock authentication
- Mock payment (QR / Cash / Transfer)
- In-memory data store (ยังไม่ต่อฐานข้อมูล)
- API แบบกระชับ 26 เส้น
- พร้อมนำไปต่อ frontend ได้ทันที

## ต่อฐานข้อมูลด้วย Supabase (Postgres)
โปรเจกต์นี้รองรับ Supabase แล้ว โดย **ถ้าใส่ ENV จะอ่าน/เขียนจาก DB** แต่ถ้าไม่ใส่จะยังทำงานแบบ in-memory เหมือนเดิม

### 1) สร้างตารางใน Supabase
รันไฟล์นี้ใน Supabase SQL Editor:
- `supabase/schema.sql`

ถ้าต้องการข้อมูลตั้งต้นแบบใน `src/data/store.js` ให้รันต่อ:
- `supabase/seed.sql`

### 2) ตั้งค่า ENV
คัดลอก `.env.example` → `.env` แล้วกรอกค่า:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (แนะนำสำหรับ backend เท่านั้น ห้ามเอาไปใช้ใน frontend)

### 3) เช็คการเชื่อมต่อ
```http
GET /health/db
```

## วิธีใช้งาน

### 1) ติดตั้ง dependency
```bash
npm install
```

### 2) รันแบบ development
```bash
npm run dev
```

### 3) รันแบบปกติ
```bash
npm start
```

เซิร์ฟเวอร์จะทำงานที่:
```bash
http://localhost:3000
```

## API Docs (Swagger)
เปิดเอกสาร API ได้ที่:
```bash
http://localhost:3000/docs
```

ไฟล์ OpenAPI JSON:
```bash
http://localhost:3000/docs/openapi.json
```

## Health Check
```http
GET /health
```

## Demo Login
```json
{
  "username": "admin",
  "password": "123456"
}
```

หรือ

```json
{
  "username": "cashier",
  "password": "123456"
}
```

เมื่อ login สำเร็จ ให้นำ `token` ไปใส่ใน Header:
```http
Authorization: Bearer <token>
```

---

## API Summary

### Auth
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/refresh`

### Dashboard
- `GET /api/v1/dashboard/overview`
- `GET /api/v1/dashboard/revenue-overall`

### Transactions
- `GET /api/v1/transactions`
- `GET /api/v1/transactions/:id`
- `POST /api/v1/transactions/:id/payment`
- `PATCH /api/v1/transactions/:id/status`

### Users
- `GET /api/v1/users`
- `POST /api/v1/users`
- `PUT /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

### Service Pricing
- `GET /api/v1/service-pricing/config`
- `PUT /api/v1/service-pricing/config`
- `POST /api/v1/service-pricing/rules`
- `DELETE /api/v1/service-pricing/rules/:id`

### Devices
- `GET /api/v1/devices/config`
- `POST /api/v1/devices`
- `PUT /api/v1/devices/:id`
- `DELETE /api/v1/devices/:id`

### Theme
- `GET /api/v1/theme`
- `PUT /api/v1/theme`

### System Settings
- `GET /api/v1/system-settings`
- `PUT /api/v1/system-settings`

---

## ตัวอย่างการสร้าง Mock QR Payment
```http
POST /api/v1/transactions/t2/payment
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "method": "qr",
  "action": "generate"
}
```

## ตัวอย่างการ confirm mock payment
```json
{
  "method": "cash"
}
```

หรือ

```json
{
  "method": "transfer",
  "referenceNo": "TRX-001"
}
```

---

## หมายเหตุสำคัญ
- ข้อมูลทั้งหมดอยู่ใน memory ถ้า restart server ข้อมูลจะกลับค่าเริ่มต้น
- QR Payment เป็น mock เท่านั้น ยังไม่เชื่อมธนาคารจริง
- เหมาะสำหรับใช้คู่กับ frontend, demo, หรือใช้เป็น starter backend

## โครงสร้างโปรเจกต์
```bash
src/
  app.js
  server.js
  data/
    store.js
  middleware/
    auth.js
  routes/
    auth.routes.js
    dashboard.routes.js
    transactions.routes.js
    users.routes.js
    servicePricing.routes.js
    devices.routes.js
    theme.routes.js
    systemSettings.routes.js
  utils/
    helpers.js
```
