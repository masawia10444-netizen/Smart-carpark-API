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
  "code": "231234"
}
```
- **Response**: 
```json
{
  "success": true,
  "deviceId": "K-20260427-001",
  "kiosk": { ... }
}
```
> **สำคัญ**: แอปฯ Kiosk ต้องบันทึกค่า `deviceId` ที่ได้รับนี้ลงในเครื่อง เพื่อใช้เรียก API อื่นๆ ในภายหลัง

---

## 🎨 2. ดึงการตั้งค่าธีม (Branding Config)
ดึงโลโก้และสีหลักที่แอดมินตั้งค่าไว้ เพื่อให้หน้าจอตู้เปลี่ยนตามอัตโนมัติ

- **Endpoint**: `GET /api/v1/kiosk/config`
- **Response**:
```json
{
  "theme": {
    "themeColor": "#1a73e8",
    "logoUrl": "http://localhost:8080/uploads/logo.png"
  },
  "systemName": "Smart Carpark Kiosk"
}
```

---

## 📥 3. สร้างบิลขาเข้า (Entry)
ใช้สำหรับตู้ขาเข้า (Entry Kiosk) เมื่อมีรถเข้ามาและกล้องอ่านทะเบียนได้ หรือลูกค้าพิมพ์ป้ายทะเบียนเองที่หน้าตู้

- **Endpoint**: `POST /api/v1/kiosk/entry`
- **Body**:
```json
{
  "deviceId": "KIOSK-IN-01",
  "plateNo": "กข-1234",
  "vehicleType": "car"
}
```
- **Response (201 Created)**: จะคืนค่าข้อมูลบิลขาเข้า พร้อมการตั้งค่าเครื่องพิมพ์กระดาษใบเสร็จเพื่อให้ตู้ไปพิมพ์ออกกระดาษ
```json
{
  "message": "Entry bill created successfully",
  "transaction": {
    "id": "t_1777000000_123",
    "billNo": "PK20260429-001",
    "plateNo": "กข-1234",
    "entryAt": "2026-04-29T16:00:00.000Z",
    "qrData": "http://localhost:3000/payment?tx=t_1777000000_123"
  },
  "receiptConfig": {
    "paperWidth": 80,
    "fontSize": 14,
    "showTitle": true
  }
}
```
> **คำแนะนำสำหรับตู้**: นำ `transaction.qrData` ไปแปลงเป็นรูป QR Code ปริ้นลงบนใบเสร็จขาเข้าด้วยครับ

---

## 🔎 4. ค้นหาทะเบียนรถ (Search)
- **Endpoint (GET)**: `GET /api/v1/kiosk/search?plateNo=ทน-4383&deviceId=KIOSK-ZONE-A-01`
- **Endpoint (PUT)**: `PUT /api/v1/kiosk/search` (รองรับการส่งผ่าน Body ตามความต้องการของหน้าบ้าน)
```json
{
  "plateNo": "ทน-4383",
  "deviceId": "KIOSK-ZONE-A-01"
}
```
- **Response**: คืนค่ารายการรถที่ยังไม่ได้จ่ายเงิน (Pending)
- **Note**: การส่ง `deviceId` ไปด้วย จะเป็นการอัปเดตสถานะ **Online** ของตู้ไปในตัว

---

## 📄 5. ดูรายละเอียดและยอดเงิน (Details)
- **Endpoint**: `GET /api/v1/kiosk/transaction/:id`
- **Response**: ยอดเงินสุทธิ (`netAmount`) และระยะเวลาจอด (`durationHour`) แบบ Real-time

---

## 💰 6. บันทึกการจ่ายเงิน (Payment)
- **Endpoint**: `POST /api/v1/kiosk/payment`
- **Body**:
```json
{
  "transactionId": "today_1",
  "method": "qr_code",
  "amount": 2190,
  "deviceId": "KIOSK-ZONE-A-01",  // (ถ้าจ่ายจากมือถือ ไม่ต้องส่งค่านี้)
  "channel": "kiosk"              // (ออปชันเสริม: ส่ง "kiosk" หรือ "mobile" เพื่อเก็บสถิติ)
}
```
- **Response**: จะได้รับ `exitTimeLimit` กลับมา (เส้นตายที่ลูกค้าต้องขับรถออก)

---

## 🛰️ 7. ส่งสัญญาณออนไลน์ (Heartbeat)
ควรเรียกใช้ทุกๆ 1-5 นาที เพื่อบอกแอดมินว่าตู้ยังไม่เสีย

- **Endpoint**: `POST /api/v1/kiosk/check-in`
- **Body**: `{ "deviceId": "KIOSK-ZONE-A-01" }`
