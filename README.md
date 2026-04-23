# Smart Carpark API (Mock Backend)

โปรเจกต์นี้เป็น Node.js + Express mock backend สำหรับระบบ Smart Carpark ฝั่ง admin โดยเน้นให้พร้อมใช้สำหรับการพัฒนา frontend หรือใช้เป็นต้นแบบ backend ก่อนเชื่อมฐานข้อมูลและ payment จริง

## คุณสมบัติ
- **Dynamic Pricing Engine**: ระบบคิดเงินอัตโนมัติตามระยะเวลา (Step Pricing) รองรับค่าจอดแบบฟรี 1 ชม. แรก หรือราคาขั้นบันได
- **Incremental Payments**: รองรับการชำระเงินหลายครั้ง (เช่น จ่ายแล้วจอดเกเกินเวลา) พร้อมระบบ Grace Period (15 นาที)
- **RBAC Security**: ระบบความปลอดภัยแยกสิทธิ์การเข้าถึง (Super Admin vs Staff)
- **Member & Staff Management**: จัดการข้อมูลพนักงานและกำหนดสิทธิ์เข้าถึงเมนูต่างๆ รายบุคคลตามหน้าจอ UI
- **Transaction Editing**: ฟังก์ชันแก้ไขข้อมูลทะเบียนรถและข้อมูลการจอดกรณีกล้อง LPR อ่านผิด
- **Mock Data**: ชุดข้อมูลพนักงานจำลอง (วิชัย, สมชาย, สมหญิง) พร้อมใช้งาน


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
- `GET /api/v1/transactions` - ค้นหาและดูรายการรถทั้งหมด
- `GET /api/v1/transactions/:id` - ดูรายละเอียดบิล
- `POST /api/v1/transactions/:id/payment` - ยืนยันการชำระเงิน (รองรับ Partial/Full payment)
- `PATCH /api/v1/transactions/:id` - แก้ไขข้อมูลทะเบียนรถหรือข้อมูลการจอด
- `DELETE /api/v1/transactions/:id` - ลบรายการบิล


### Members (Staff Management)
- `GET /api/v1/members/stats` - ดูสถิติจำนวนพนักงาน
- `GET /api/v1/members` - รายชื่อพนักงานทั้งหมด
- `POST /api/v1/members` - เพิ่มพนักงานใหม่
- `PATCH /api/v1/members/:id` - แก้ไขข้อมูลส่วนตัวพนักงาน
- `PATCH /api/v1/members/:id/permissions` - แก้ไขสิทธิ์การเข้าถึงเมนู
- `DELETE /api/v1/members/:id` - ลบพนักงาน


### Service Pricing (Managed by Super Admin)
- `GET /api/v1/service-pricing/config` - ดูการตั้งค่าราคาทั้งหมด
- `POST /api/v1/service-pricing/rules` - เพิ่มกฎราคาใหม่
- `PATCH /api/v1/service-pricing/rules/:id` - แก้ไขกฎราคา (ราคา/ช่วงเวลา)
- `DELETE /api/v1/service-pricing/rules/:id` - ลบกฎราคา


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
