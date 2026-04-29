# 📱 Smart Carpark - Mobile E-Payment API Guide

คู่มือสำหรับการพัฒนาแอปพลิเคชันเว็บมือถือ (Mobile Web App) ที่ลูกค้าเข้าถึงโดยการแสกน QR Code จากกระดาษใบเสร็จเพื่อชำระเงิน

## 🚀 ภาพรวมขั้นตอนการทำงาน (Workflow)
1. **Scan**: ลูกค้าแสกน QR Code ซึ่งมี URL หน้าเว็บพร้อมรหัสอ้างอิง `tx` (เช่น `?tx=today_1`)
2. **Fetch**: หน้าเว็บ Mobile ดึงข้อมูลรายละเอียดของรถและยอดเงินมาแสดงผล
3. **Pay**: ลูกค้ากดยืนยันการชำระเงิน (จำลองการตัดบัตร/พร้อมเพย์)
4. **Complete**: หน้าเว็บแสดงผลว่าทำรายการสำเร็จ

---

## 📄 1. ดึงข้อมูลรายละเอียดบิลและยอดเงิน (Transaction Details)
หน้าเว็บมือถือจะดึงรหัส `tx` จาก URL Parameter แล้วนำมายิง API เส้นนี้เพื่อดึงยอดเงินมาโชว์บนหน้าจอ

- **Endpoint**: `GET /api/v1/mobile/transaction/:id`
- **ตัวอย่าง**: `GET /api/v1/mobile/transaction/today_1`
- **Response (200 OK)**:
```json
{
  "id": "today_1",
  "billNo": "PK20260427-001",
  "plateNo": "กข-1234",
  "vehicleType": "car",
  "entryAt": "2026-04-27T08:00:00.000Z",
  "status": "pending",
  "baseAmount": 100,
  "netAmount": 100,
  "durationHour": 2,
  "totalMinutes": 120
}
```
> **ความปลอดภัย**: หากลูกค้าเอา QR Code เก่าที่เคยจ่ายเงินและขับรถออกไปแล้วมาแสกนซ้ำ API จะตอบกลับด้วยสถานะ `403 Forbidden` ทันทีเพื่อปกป้องข้อมูลส่วนตัวของลูกค้า

---

## 💰 2. ยืนยันการชำระเงิน (Confirm Payment)
เมื่อลูกค้ากดปุ่มยืนยันจ่ายเงินผ่านแอปธนาคารสำเร็จ ให้หน้าเว็บ Mobile ยิง API เส้นนี้เพื่อบันทึกสถานะกลับมาที่ระบบส่วนกลาง

- **Endpoint**: `POST /api/v1/mobile/payment`
- **Body**:
```json
{
  "transactionId": "today_1",
  "method": "epay",
  "amount": 100
}
```
*(ระบบจะรับรู้โดยอัตโนมัติว่ารายการนี้มาจากช่องทาง Mobile Web เพื่อนำไปจัดทำสถิติรายได้แยกช่องทาง)*

- **Response (200 OK)**:
```json
{
  "message": "Payment received successfully",
  "transaction": {
    "id": "today_1",
    "status": "completed",
    "exitTimeLimit": "2026-04-27T10:15:00.000Z"
  }
}
```
> **สิ่งที่ต้องทำต่อ**: หลังจากได้รับ Response สำเร็จ ให้นำค่า `exitTimeLimit` ไปแสดงบนหน้าจอมือถือเพื่อให้ลูกค้ารู้ว่าต้องขับรถออกจากอาคารก่อนเวลาเท่าไหร่ (เช่น "กรุณานำรถออกก่อนเวลา 10:15 น.")

---
