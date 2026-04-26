# 🚀 Smart Carpark Frontend API Guide

คู่มือฉบับนี้จัดทำขึ้นเพื่อให้ทีม Frontend เข้าใจวิธีการเชื่อมต่อ API และโครงสร้างข้อมูลที่ถูกต้อง โดยเฉพาะฟีเจอร์ใหม่เรื่องการคิดเงินและสิทธิ์การใช้งาน

---

## 🔑 1. การยืนยันตัวตน (Authentication)
ทุก API (ยกเว้น Login) ต้องส่ง **Bearer Token** ใน Header:
```http
Authorization: Bearer <your_token>
```

### 🔓 ข้อมูลสิทธิ์ (Permissions)
หลังจาก Login สำเร็จ ระบบจะคืนค่า `user.permissions` เป็น Array ของ Key (เช่น `dashboard`, `transactions`)
- **หน้าที่ของ Front-end**: ใช้ Key เหล่านี้ในการเลือกแสดงผล Sidebar เมนู หรือปุ่มต่างๆ
- **หมายเหตุ**: หากเรียก API ที่ไม่มีสิทธิ์ ระบบจะคืนค่า `403 Forbidden`

---

## 📊 2. หน้าสรุปผล (Dashboard) - ข้อมูลวันนี้
**Endpoint**: `GET /api/v1/dashboard`
เน้นข้อมูล **Real-time วันนี้** สำหรับดูสถานการณ์ปัจจุบันของอาคารจอดรถ

---

## 📈 3. หน้าภาพรวมวิเคราะห์ (Overview & Analytics)
**Endpoint**: `GET /api/v1/overview/summary`
ใช้สำหรับดูสถิติย้อนหลังและรายงานเชิงวิเคราะห์ (Historical Analysis)

### 💡 จุดเด่นที่ Front-end ต้องรู้:
- **Filters**: สามารถส่ง `start_date` และ `end_date` เพื่อดูข้อมูลตามช่วงเวลาได้
- **Dynamic Usage Chart**: ฟิลด์ `usageChart` จะคำนวณ `label` ให้อัตโนมัติตามระยะเวลา:
    - เลือกไม่เกิน 21 วัน = กราฟรายวัน
    - เลือกไม่เกิน 90 วัน = กราฟรายสัปดาห์
    - เลือกมากกว่า 90 วัน = กราฟรายเดือน
- **Service Summary**: สรุปเปอร์เซ็นต์และยอดเงินแยกตามช่องทางบริการแบบละเอียด

---

## 🚗 4. ระบบจัดการรถและชำระเงิน (Transactions)
หมวดนี้สำคัญที่สุดสำหรับการเงิน:

### 🔎 การดึงรายการ
**Endpoint**: `GET /api/v1/transactions`
- **Query Params**: สามารถส่ง `keyword` (ทะเบียน/เลขบิล) หรือ `status` (pending/completed) ไปค้นหาได้

### 💰 การยืนยันชำระเงิน (Payment)
**Endpoint**: `POST /api/v1/transactions/:id/payment`
- **Payload**: `{ "method": "cash", "channel": "cashier" }`
- **การตอบกลับ**:
    - `transaction.status`: จะเปลี่ยนเป็น `completed` หากจ่ายครบ
    - `transaction.isOverstay`: หากกลับมาเช็คบิลเดิมแล้วมีค่าเป็น `true` แสดงว่าลูกค้าทำเกินเวลาผ่อนปรน (Front-end ควรแจ้งเตือนให้จ่ายเพิ่ม)
    - `transaction.exitTimeLimit`: คือเวลา "เส้นตาย" ที่รถต้องออก (ให้โชว์ในใบเสร็จดิจิทัล)

---

## 📜 4. การแสดงผลใบเสร็จ (Receipt Settings)
**Endpoint**: `GET /api/v1/system-settings/receipt`
Front-end ต้องใช้ข้อมูลจากที่นี่ในการ "วาด" (Render) หน้าพรีวิวใบเสร็จ:
- `entryBill`: สิทธิ์การโชว์ฟิลด์ในบิลขาเข้า
- `paymentBill`: สิทธิ์การโชว์ฟิลด์ในบิลขาออก (เช่น `showExpiryTime` และ `expiryDuration`)

---

## 🎨 5. ธีมและโลโก้ (Theme Settings)
**Endpoint**: `GET /api/v1/theme`
ใช้สำหรับกำหนดสีหลักและโลโก้ของระบบให้ตรงตามที่แอดมินตั้งค่าไว้

---

*คำเตือน: หากมีข้อสงสัยเรื่องโครงสร้าง JSON ให้ดูผลลัพธ์จริงจาก SwaggerDocs ที่ `/docs` ได้เลยครับ!*
