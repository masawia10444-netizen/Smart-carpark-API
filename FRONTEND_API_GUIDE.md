# 🚀 Smart Carpark Frontend API Guide

คู่มือฉบับนี้จัดทำขึ้นเพื่อให้ทีม Frontend เข้าใจวิธีการเชื่อมต่อ API และโครงสร้างข้อมูลที่ถูกต้อง โดยเฉพาะฟีเจอร์เรื่องการคิดเงินและสิทธิ์การใช้งาน

---

## 🔑 1. การยืนยันตัวตน (Authentication)
ทุก API ต้องส่ง **Bearer Token** ใน Header:
```http
Authorization: Bearer <your_token>
```
- **Login**: `POST /api/v1/auth/login`
- **Refresh Token**: `POST /api/v1/auth/refresh`
    - **Payload**: `{ "refreshToken": "..." }`
    - **การใช้งาน**: ใช้สำหรับขอ Access Token ชุดใหม่เมื่อชุดเดิมหมดอายุ
- **สิทธิ์การใช้งาน**: หลัง Login จะได้รับ `user.permissions` (เช่น `dashboard`, `transactions`) เพื่อใช้ควบคุมการแสดงผลเมนู

---

## 📊 2. Dashboard & Overview
- **วันนี้ (Real-time)**: `GET /api/v1/dashboard`
- **สถิติวิเคราะห์ (Analytics)**: `GET /api/v1/overview/summary`
    - รองรับ `start_date` และ `end_date`
    - กราฟจะเปลี่ยนเป็น Daily/Weekly/Monthly ให้อัตโนมัติตามช่วงเวลาที่เลือก

---

## 🚗 3. ระบบจัดการรถและชำระเงิน (Transactions)
หมวดหมู่ที่สำคัญที่สุด:
- **ค้นหารายการ**: `GET /api/v1/transactions`
- **รายละเอียดบิล**: `GET /api/v1/transactions/:id`
- **💰 การยืนยันชำระเงิน**: `POST /api/v1/transactions/:id/payment`
    - **Payload**: `{ "method": "cash", "channel": "cashier", "amount": 1610 }`
    - หากไม่ส่ง `amount` มา ระบบจะถือว่าจ่ายครบตามยอดค้างชำระ
- **โครงสร้างการเงินใหม่**:
    - `baseAmount`: ยอดค่าจดรถตั้งต้นตามตารางราคา
    - `netAmount`: ยอดสุทธิสุดท้ายที่ต้องจ่ายจริง
    - `totalPaid`: ยอดที่ชำระมาแล้วทั้งหมด
    - `remainingAmount`: ยอดคงเหลือที่ต้องจ่ายเพิ่ม
    - `payments[].paidAmount`: ยอดที่จ่ายจริงในแต่ละครั้ง

---

## 🎨 4. ธีมและโลโก้ (Theme Settings)
- **ดึงธีม**: `GET /api/v1/theme`
- **📸 อัปโหลดโลโก้**: `POST /api/v1/theme/upload-logo`
    - ใช้ `FormData` ส่งไฟล์ในฟิลด์ชื่อ `logo`
    - จะได้รับ `logoUrl` กลับมาสำหรับนำไปใช้ใน `<img src="...">`

---

## ⚙️ 5. ตั้งค่าระบบและใบแจ้งหนี้
- **กฎราคา**: `GET /api/v1/service-pricing/config`
- **รูปแบบใบเสร็จ**: `GET /api/v1/system-settings/receipt`
    - ใช้สำหรับสั่งให้หน้าบ้านเปิด/ปิดฟิลด์ต่างๆ ในบิลขาเข้าและขาออก

---

*หมายเหตุ: ข้อมูลทั้งหมดเป็นแบบ Real-time และมีการตรวจสอบสิทธิ์ (RBAC) ทุกครั้งที่เรียกใช้งาน*
