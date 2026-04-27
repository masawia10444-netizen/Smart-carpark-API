# 📟 Smart Carpark - Kiosk API Guide

คู่มือสำหรับการพัฒนาแอปพลิเคชันตู้ Kiosk (Payment Station) เพื่อเชื่อมต่อกับระบบหลังบ้าน

## 🚀 ภาพรวมขั้นตอนการทำงาน (Workflow)
1. **Activation**: ลงทะเบียนเครื่องครั้งแรก (ช่างเทคนิคทำผ่านรหัส 6 หลักจากแอดมิน)
2. **Setup**: แอปฯ Kiosk บันทึก `deviceId` และดึง `config` (ธีมสี/โลโก้) มาแสดงผล
3. **Standby**: หน้าจอโชว์ช่องให้กรอกทะเบียนรถ
4. **Transaction**: ลูกค้ากรอกทะเบียน -> ดึงบิล -> แสดงยอดเงิน -> รับชำระเงิน
5. **Heartbeat**: ตู้ส่งสัญญาณออนไลน์ (Check-in) ทุกครั้งที่มีการใช้งาน หรือตามรอบเวลา

---

## 🔐 1. การลงทะเบียนตู้ (Activation)
ใช้สำหรับผูกเครื่อง Kiosk เข้ากับระบบแอดมิน (ไม่ต้องใช้ Token)

- **Endpoint**: `POST /api/v1/kiosk/activate`
- **Body**:
```json
{
  "code": "231234", 
  "deviceId": "KIOSK-ZONE-A-01"
}
```
- **Response**: จะได้รับข้อมูลตู้ที่แอดมินตั้งชื่อไว้ (ให้บันทึก `deviceId` ลงในเครื่องเพื่อใช้เรียก API อื่นๆ)

---

## 🎨 2. ดึงการตั้งค่าธีม (Branding Config)
ดึงโลโก้และสีหลักที่แอดมินตั้งค่าไว้ เพื่อให้หน้าจอตู้เปลี่ยนตามอัตโนมัติ

- **Endpoint**: `GET /api/v1/kiosk/config`
- **Response**:
```json
{
  "theme": {
    "primaryColor": "#1a73e8",
    "logoUrl": "http://localhost:8080/uploads/logo.png"
  },
  "systemName": "Smart Carpark Kiosk"
}
```

---

## 🔎 3. ค้นหาทะเบียนรถ (Search)
- **Endpoint**: `GET /api/v1/kiosk/search?plateNo=ทน-4383&deviceId=KIOSK-ZONE-A-01`
- **Response**: คืนค่ารายการรถที่ยังไม่ได้จ่ายเงิน (Pending)
- **Note**: การส่ง `deviceId` ไปด้วย จะเป็นการอัปเดตสถานะ **Online** ของตู้ไปในตัว

---

## 📄 4. ดูรายละเอียดและยอดเงิน (Details)
- **Endpoint**: `GET /api/v1/kiosk/transaction/:id`
- **Response**: ยอดเงินสุทธิ (`netAmount`) และระยะเวลาจอด (`durationHour`) แบบ Real-time

---

## 💰 5. บันทึกการจ่ายเงิน (Payment)
- **Endpoint**: `POST /api/v1/kiosk/payment`
- **Body**:
```json
{
  "transactionId": "today_1",
  "method": "qr_code",
  "amount": 2190,
  "deviceId": "KIOSK-ZONE-A-01"
}
```
- **Response**: จะได้รับ `exitTimeLimit` กลับมา (เส้นตายที่ลูกค้าต้องขับรถออก)

---

## 🛰️ 6. ส่งสัญญาณออนไลน์ (Heartbeat)
ควรเรียกใช้ทุกๆ 1-5 นาที เพื่อบอกแอดมินว่าตู้ยังไม่เสีย

- **Endpoint**: `POST /api/v1/kiosk/check-in`
- **Body**: `{ "deviceId": "KIOSK-ZONE-A-01" }`
