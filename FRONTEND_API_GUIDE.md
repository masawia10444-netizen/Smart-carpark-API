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
- **🗑️ ลบโลโก้**: `DELETE /api/v1/theme/logo` (ลบไฟล์จริงออกจากเซิร์ฟเวอร์ทันที)

---

## ⚙️ 5. ตั้งค่าระบบและใบแจ้งหนี้
- **กฎราคา**: `GET /api/v1/service-pricing/config`
- **รูปแบบใบเสร็จ**: `GET /api/v1/system-settings/receipt`
    - ใช้สำหรับสั่งให้หน้าบ้านเปิด/ปิดฟิลด์ต่างๆ ในบิลขาเข้าและขาออก

---

## 📟 6. การจัดการตู้ Kiosk (Kiosk Management)

ใช้สำหรับหน้าจอแอดมินในการคุมตู้จ่ายเงินทั้งหมด:
- **รายชื่อตู้**: `GET /api/v1/devices/kiosks`
- **🎫 ออกรหัสลงทะเบียน**: `POST /api/v1/devices/kiosks/activation-code`
    - Payload: `{ "name": "ตู้ชั้น 1", "location": "Lobby A" }`
    - ระบบจะคืนค่า `code` (6 หลัก) และ `deviceId` (จองไว้ให้) กลับมาทันที
- **✏️ แก้ไขตู้**: `PUT /api/v1/devices/kiosks/:deviceId`
- **🗑️ ลบตู้**: `DELETE /api/v1/devices/kiosks/:deviceId`

---

*หมายเหตุ: ข้อมูลทั้งหมดเป็นแบบ Real-time และมีการตรวจสอบสิทธิ์ (RBAC) ทุกครั้งที่เรียกใช้งาน*

---

## ⚡ 7. การทำงานแบบ Real-time (Server-Sent Events)

สำหรับหน้าจอ **ตู้ Kiosk** ที่ต้องการเปลี่ยนธีม/สี/โลโก้ ทันทีที่แอดมินกด Save โดยไม่ต้องรีเฟรชหน้าจอ ให้ใช้การเชื่อมต่อแบบ SSE

**การเรียกใช้งาน (ฝั่ง Frontend):**
ใช้คำสั่ง `EventSource` ที่มีมาให้ในเบราว์เซอร์ โดยเชื่อมต่อทันทีเมื่อแอปเริ่มทำงาน (Boot up)

```javascript
// 1. เปิดการเชื่อมต่อ (จำเป็นต้องแนบ deviceId เพื่อความปลอดภัย)
const deviceId = 'YOUR_DEVICE_ID';
const evtSource = new EventSource(`http://localhost:8080/api/v1/kiosk/events?deviceId=${deviceId}`);

// 2. รับฟังเหตุการณ์
evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // หากเป็นการอัปเดตธีม
    if (data.type === 'theme_updated') {
        const newTheme = data.theme;
        // นำ newTheme ไปปรับแต่ง CSS Variables ได้ทันที
        console.log('อัปเดตธีมแล้ว:', newTheme);
        // ตัวอย่าง: document.documentElement.style.setProperty('--primary', newTheme.themeColor);
    }
};

// 3. การจัดการ Error (เน็ตหลุด)
evtSource.onerror = (err) => {
    console.error("หลุดการเชื่อมต่อจากเซิร์ฟเวอร์", err);
    // เบราว์เซอร์จะพยายามเชื่อมต่อใหม่ให้อัตโนมัติ (Auto-reconnect)
};
```
