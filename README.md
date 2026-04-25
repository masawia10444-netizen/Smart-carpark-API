# Smart Carpark API (Mock Backend)

โปรเจกต์นี้เป็น Node.js + Express mock backend สำหรับระบบ Smart Carpark ฝั่ง admin โดยเน้นให้พร้อมใช้สำหรับการพัฒนา frontend หรือใช้เป็นต้นแบบ backend ก่อนเชื่อมฐานข้อมูลและ payment จริง

## คุณสมบัติเด่น
- **🚀 Dynamic Pricing Engine**: ระบบคิดเงินอัตโนมัติตามระยะเวลา (Step Pricing) รองรับค่าจอดแบบฟรี 1 ชม. แรก หรือราคาขั้นบันได
- **💸 Incremental Payments & Overstay**: รองรับการชำระเงินหลายครั้ง และคำนวณเงินเพิ่มอัตโนมัติหากจอดเกินเวลาผ่อนปรน (Grace Period)
- **🔐 Granular RBAC Security**: ระบบความปลอดภัยแบบล็อค 2 ชั้น (Role + Permissions) ตรวจสอบสิทธิ์อย่างเข้มงวด
- **📋 Receipt Customization**: แอดมินกำหนดได้เองว่าจะแสดงฟิลด์ไหนในใบแจ้งหนี้ (เช่น เวลาหมดอายุในบิลหลังชำระ)
- **👥 Member Management**: จัดการข้อมูลพนักงานและกำหนดสิทธิ์เข้าถึงเมนูต่างๆ รายบุคคลตามกลุ่มหน้าที่
- **📸 Transaction Editing**: ฟังก์ชันแก้ไขข้อมูลทะเบียนรถและข้อมูลการจอดกรณีกล้อง LPR อ่านผิด
- **📦 Mock Data**: ข้อมูลครบถ้วน ทั้งประวัติการจอดจำลองกว่า 50 รายการ และบัญชีพนักงานพร้อมทดสอบ

---

## สิทธิ์การใช้งานระบบ (Permissions)
ระบบใช้ Key สั้นๆ ในการควบคุมการเข้าถึงเมนู ซึ่งสามารถกำหนดให้พนักงานแต่ละคนได้ในหน้า "การตั้งค่าสมาชิก":
- `dashboard`: เข้าถึงหน้าสรุปยอดขายรายวัน (Real-time)
- `transactions`: เข้าถึงหน้าตรวจค้นทะเบียนรถ และกดยืนยันการชำระเงิน
- `overview`: เข้าถึงหน้าสรุปวิเคราะห์ข้อมูลเชิงสถิติ (Grand Totals)
- `pricing`: เข้าถึงหน้าตั้งค่ากฎราคาค่าบริการและช่องทางการชำระเงิน
- `devices`: เข้าถึงหน้าจัดการและตรวจสอบสถานะอุปกรณ์ (Camera, Gate, Kiosk)
- `theme`: เข้าถึงหน้าตั้งค่าสีและธีมของระบบ
- `settings`: เข้าถึงหน้าตั้งค่าระบบทั่วไป

*หมายเหตุ: เฉพาะสิทธิ์การจัดการสมาชิก (Members Management) จะถูกล็อคไว้ให้ระดับ **`super_admin`** เท่านั้น*

---

## วิธีใช้งาน

### 1) ติดตั้ง dependency
```bash
npm install
```

### 2) รันเซิร์ฟเวอร์
```bash
npm start
```

เซิร์ฟเวอร์จะทำงานที่พอร์ต **8080**:
```bash
http://localhost:8080
```

### 3) API Docs (Swagger / OpenAPI)
- เอกสาร API: `http://localhost:8080/docs`
- ไฟล์ OpenAPI JSON: `http://localhost:8080/docs/openapi.json`

---

## Demo Login

| Role | Username | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin1` | `123` | เข้าถึงได้ทุกเมนู |
| **Cashier** | `cashier` | `123456` | `dashboard`, `transactions` |
| **Super Admin (Main)** | `superadmin` | `123456` | เข้าถึงได้ทุกเมนู |

เมื่อ login สำเร็จ ให้นำ `token` ไปใส่ใน Header:
```http
Authorization: Bearer <token>
```

---

## API Summary (V1)

### 🔑 Auth
- `POST /api/v1/auth/login` - เข้าสู่ระบบ (คืนค่าโปรไฟล์และ Permissions)
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me` - ตรวจสอบข้อมูลผู้ใช้งานไอดีปัจจุบัน

### 📊 Dashboard
- `GET /api/v1/dashboard` - สถิติรายวันแบบ Real-time

### 🔍 Transactions (Parking Operations)
- `GET /api/v1/transactions` - ค้นหารายการรถ (ทะเบียน/เลขบิล)
- `POST /api/v1/transactions/:id/payment` - ยืนยันการรับชำระเงิน
- `PATCH /api/v1/transactions/:id` - แก้ไขข้อมูลรถ (กรณีกล้องอ่านผิด)

### 👥 Members (Management - Super Admin Only)
- `GET /api/v1/members` - จัดการพนักงานทั้งหมด
- `PATCH /api/v1/members/:id/permissions` - อัปเดตสิทธิ์การใช้งาน (ใช้ Permission Keys ด้านบน)

### ⚙️ Settings & Pricing
- `GET/POST/PATCH /api/v1/service-pricing/rules` - กฎราคาค่าจอด
- `GET/PATCH /api/v1/payment-settings/methods` - เปิด/ปิด ช่องทางรับเงิน
- `GET/PUT /api/v1/devices/config` - จัดการอุปกรณ์

---

## หมายเหตุสำคัญ
- **In-Memory Store**: ข้อมูลทั้งหมดอยู่ใน RAM ถ้า Restart Server ข้อมูลที่แก้ไขจะกลับเป็นค่าตั้งต้น (ยกเว้นกรณีเชื่อมต่อ Supabase)
- **Security Check**: การแก้ไขผ่าน Postman หรือเครื่องมืออื่นๆ จะถูกตรวจสอบสิทธิ์หลังบ้านทุกครั้ง (403 Forbidden หากสิทธิ์ไม่พอ)
