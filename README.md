# Smart Carpark API (Mock Backend)

โปรเจกต์นี้เป็น Node.js + Express mock backend สำหรับระบบ Smart Carpark ฝั่ง admin โดยเน้นให้พร้อมใช้สำหรับการพัฒนา frontend หรือใช้เป็นต้นแบบ backend ก่อนเชื่อมฐานข้อมูลและ payment จริง

## คุณสมบัติเด่น
- **🚀 Dynamic Pricing Engine**: ระบบคิดเงินอัตโนมัติตามระยะเวลา (Step Pricing) รองรับค่าจอดแบบฟรี 1 ชม. แรก หรือราคาขั้นบันได
- **💸 Incremental Payments & Overstay**: รองรับการชำระเงินหลายครั้ง และคำนวณเงินเพิ่มอัตโนมัติหากจอดเกินเวลาผ่อนปรน (Grace Period)
- **🔐 Granular RBAC Security**: ระบบความปลอดภัยแบบล็อค 2 ชั้น (Role + Permissions) ตรวจสอบสิทธิ์อย่างเข้มงวด
- **🎨 Custom Branding**: ระบบจัดการธีมที่รองรับการ **อัปโหลดภาพโลโก้ (Logo Upload)** และกำหนดสีหลักขององค์กรได้เองผ่านหลังบ้าน
- **📈 Advanced Analytics**: หน้า Overview ที่วิเคราะห์ข้อมูลเปรียบเทียบสัดส่วนรายได้แยกตามช่องทาง (Cashier, Kiosk, E-pay, Gate) พร้อมกราฟแสดงสถิติตามช่วงเวลา
- **📜 Smart Receipt Config**: แอดมินกำหนดได้เองว่าจะแสดงฟิลด์ไหนในใบแจ้งหนี้ และตั้งค่าเวลาผ่อนปรน (Grace Period) หลังชำระเงินได้แบบอิสระ
- **💸 Accurate Financials**: ปรับปรุงโครงสร้างข้อมูลการเงินใหม่ (`baseAmount`, `netAmount`, `paidAmount`) เพื่อความแม่นยำในการทำบัญชีและลดความสับสนของทีม Frontend
- **🔐 Granular RBAC Security**: ระบบความปลอดภัยล็อค 2 ชั้น (Role + Permissions) ตรวจสอบสิทธิ์รายเมนูอย่างเข้มงวด
- **👥 Member Management**: จัดการข้อมูลพนักงานและกำหนดสิทธิ์เข้าถึงเมนูต่างๆ รายบุคคลตามกลุ่มหน้าที่
- **📸 Transaction Editing**: ฟังก์ชันแก้ไขข้อมูลทะเบียนรถและข้อมูลการจอดกรณีกล้อง LPR อ่านผิด
- **📟 Kiosk Ecosystem**: ระบบตู้จ่ายเงินอัตโนมัติ (Search, Pay, Activation Flow) ที่ทำงานแบบไร้รอยต่อ
- **🛰️ Device Monitoring**: ระบบตรวจสอบสถานะออนไลน์ของตู้ Kiosk และอุปกรณ์ต่างๆ ในระบบแบบ Real-time
- **📦 Mock Data**: ข้อมูลครบถ้วน ทั้งประวัติการจอดจำลองกว่า 50 รายการ และบัญชีพนักงานพร้อมทดสอบ

---

## 📖 คู่มือการเชื่อมต่อสำหรับทีม Frontend
สำหรับนักพัฒนาฝั่งหน้าบ้าน สามารถศึกษาโครงสร้าง JSON และขั้นตอนการเรียกใช้ API ล่วงหน้าได้ที่:
👉 **[FRONTEND_API_GUIDE.md](file:///d:/R&D/Smart-Carpark-api/FRONTEND_API_GUIDE.md)**

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

## API Summary (Comprehensive List)

### 🔑 Authentication (`/api/v1/auth`)
- `POST /login` - เข้าสู่ระบบ (คืนค่า Profile + Token + Permissions)
- `POST /logout` - ออกจากระบบ
- `POST /refresh` - รีเฟรช Token
- `GET /me` - ตรวจสอบข้อมูลผู้ใช้ปัจจุบัน

### 🚗 Kiosk & Self-Service (ไม่ต้องใช้ Token) (`/api/v1/kiosk`)
- `POST /activate` - ผูกตู้ Kiosk เข้ากับระบบ (นำ Code 6 หลักมาแลก Device ID)
- `GET /config` - ดึงธีม โลโก้ และสถานะของตู้ไปแสดงที่หน้าจอ
- `GET /events` - ท่อเชื่อมต่อ SSE แบบ Real-time เพื่อรอรับคำสั่งเปลี่ยนธีม
- `POST /entry` - ตู้สั่งสร้างบิลตอนรถขับเข้า (Auto Generate Bill)
- `GET /search` - ค้นหารถที่กำลังจอดอยู่ (ลูกค้าพิมพ์ทะเบียนค้นหา)
- `GET /transaction/:id` - ดึงข้อมูลบิลและยอดเงิน (Public API สำหรับตู้หรือสแกน QR)
- `POST /payment` - รับแจ้งผลการชำระเงินจากตู้ Kiosk เพื่อตัดยอด

### 📊 Dashboard & Overview
- `GET /api/v1/dashboard` - สรุปยอดขาย Real-time วันนี้
- `GET /api/v1/overview/summary` - รายงานสรุปเชิงวิเคราะห์ตามช่วงเวลา (Grand Totals)

### 🚙 Transactions (Admin / Cashier) (`/api/v1/transactions`)
- `GET /` - ค้นหาและดูรายการรถทั้งหมด
- `POST /` - สร้างบิลขาเข้า (กรณีคีย์ทะเบียนรถเองด้วยมือ)
- `GET /:id` - ดูรายละเอียดบิลและประวัติการจ่ายเงิน
- `POST /:id/payment` - บันทึกการชำระเงินโดยพนักงาน (คำนวณ Overstay อัตโนมัติ)
- `PATCH /:id/status` - เปลี่ยนสถานะบิล (เช่น ยกเลิก)
- `PATCH /:id` - แก้ไขทะเบียนรถ
- `DELETE /:id` - ลบบิลรายการจอด

### 👥 Users & Member Management (`/api/v1/users` & `/api/v1/members`)
- `GET, POST, PUT, DELETE /api/v1/users` - จัดการบัญชีพนักงานและสิทธิ์การเข้าถึงเมนูต่างๆ
- `GET, POST, PATCH, DELETE /api/v1/members` - จัดการข้อมูลสมาชิกลานจอดรถรายเดือน

### 💰 Service Pricing (`/api/v1/service-pricing`)
- `GET, PUT /config` - ดู/แก้ไข การตั้งค่ากฎราคาและเวลาผ่อนปรน (Grace Period)
- `POST, DELETE /rules` - เพิ่ม/ลบ กฎค่าบริการพิเศษ

### ⚙️ System & Device Settings (`/api/v1/system-settings`, `/api/v1/theme`, `/api/v1/devices`)
- `POST /api/v1/devices/kiosks/activation-code` - ออกรหัส PIN 6 หลักสำหรับนำไปให้ช่างตั้งค่าตู้ Kiosk
- `GET, POST, PUT, DELETE /api/v1/devices` - ดูสถานะและจัดการอุปกรณ์ในระบบ
- `GET, PUT /api/v1/theme` - ดึงและอัปเดตสีธีมระบบ
- `POST /api/v1/theme/upload-logo` - อัปโหลดภาพโลโก้ระบบ (รองรับ jpg, png, svg)
- `DELETE /api/v1/theme/logo` - ลบภาพโลโก้ปัจจุบัน
- `GET, PUT /api/v1/system-settings` - ดึงและอัปเดตการตั้งค่าระบบทั่วไป
- `GET, PUT /api/v1/system-settings/receipt` - ตั้งค่าข้อมูลการแสดงผลใบแจ้งหนี้
- `PUT /api/v1/system-settings/receipt/printer` - ตั้งค่าขนาดกระดาษและฟอนต์สำหรับเครื่องปรินต์ Kiosk

---

## 🛠 การตรวจสอบสิทธิ์ (Security Workflow)
พนักงาน (Staff) ที่จะเข้าถึง API ด้านบนได้ **ต้องได้รับสิทธิ์ (Permissions)** ที่ตรงกับฟังก์ชันนั้นๆ เช่น:
- จะเรียก `/api/v1/dashboard` ได้ ต้องมีสิทธิ์ `dashboard`
- จะเรียก `/api/v1/service-pricing` ได้ ต้องมีสิทธิ์ `pricing`
- **Super Admin** สามารถเรียกได้ทุกเส้นโดยไม่ต้องตรวจสอบสิทธิ์แยกรายเมนู

---

## หมายเหตุสำคัญ
- **In-Memory Store**: ข้อมูลทั้งหมดอยู่ใน RAM ถ้า Restart Server ข้อมูลที่แก้ไขจะกลับเป็นค่าตั้งต้น (ยกเว้นกรณีเชื่อมต่อ Supabase)
- **Security Check**: การแก้ไขผ่าน Postman หรือเครื่องมืออื่นๆ จะถูกตรวจสอบสิทธิ์หลังบ้านทุกครั้ง (403 Forbidden หากสิทธิ์ไม่พอ)
