# 🚀 Front-end Integration Guide: Smart Carpark API

คู่มือการเชื่อมต่อ API สำหรับทีม Front-end โดยละเอียด ครอบคลุมทุกระบบหลักของ Smart Carpark Admin System

---

## 📌 ข้อมูลพื้นฐาน (Base Info)

- **Base URL**: `http://localhost:3000` (หรือตามที่ Deploy จริง)
- **Content-Type**: `application/json`
- **Authentication**: ใช้ Bearer Token ใน Request Header
  ```http
  Authorization: Bearer <your-access-token>
  ```

---

## 🔐 1. ระบบยืนยันตัวตน (Authentication)

### Login
- **Endpoint**: `POST /api/v1/auth/login`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "your-password"
  }
  ```
- **Response (200)**: เก็บ `token` ไว้ใน LocalStorage/Cookie
  ```json
  {
    "token": "mock-token-u1-...",
    "refreshToken": "mock-refresh-u1-...",
    "user": {
      "id": "u1",
      "name": "Admin Parking",
      "role": "super_admin"
    }
  }
  ```

---

## 📊 2. แดชบอร์ดและข้อมูลสถิติ (Dashboard & Analytics)

### Real-time Dashboard (หน้าแรก)
- **Endpoint**: `GET /api/v1/dashboard`
- **Purpose**: แสดงผลข้อมูลสรุปของ "วันนี้" เท่านั้น
- **Key Data**:
  - `summaryCards`: จำนวนบิล, รายได้, รายการค้าง
  - `revenueGroups`: เปรียบเทียบโหมดพนักงานช่วยจ่าย vs สแกนจ่าย
  - `channelBreakdown`: แยกยอดเงินตามช่องทาง (Cashier, Kiosk, Mobile, Gate)

### Analytics Overview (หน้าสรุปยอดรวม/สถิติ)
- **Endpoint**: `GET /api/v1/overview/summary`
- **Query Params**: `?start_date=ISO_DATE&end_date=ISO_DATE`
- **Key Data**:
  - `usageChart`: Array สำหรับวาดกราฟเส้น (Label: วันในสัปดาห์, Value: จำนวน)
  - `serviceSummary`: รายชื่อบริการพร้อมยอดเงินและเปอร์เซ็นต์ส่วนแบ่งรายได้

---

## 🚗 3. ระบบจัดการธุรกรรม (Transactions)

### รายการธุรกรรมทั้งหมด (Search & Table)
- **Endpoint**: `GET /api/v1/transactions`
- **Query Params**: `?plate_no=กข123&status=pending&page=1&per_page=10`
- **Structure**:
  ```json
  {
    "data": [
      {
        "id": "t1",
        "billNo": "B2026-001",
        "plateNo": "กข-1234",
        "amount": 80,
        "status": "pending",
        "entryAt": "2026-04-22T08:00:00Z"
      }
    ],
    "meta": { "total": 100, "totalPages": 10 }
  }
  ```

### ยืนยันการชำระเงิน (Confirm Payment)
- **Endpoint**: `POST /api/v1/transactions/{id}/payment`
- **Request Body**:
  ```json
  {
    "method": "qr",
    "channel": "cashier",
    "printReceipt": true
  }
  ```

---

## 👥 4. จัดการเจ้าหน้าที่ (Staff Management)

### รายชื่อผู้ใช้งาน
- **Endpoint**: `GET /api/v1/users`
- **Create User**: `POST /api/v1/users`
- **Update User**: `PUT /api/v1/users/{id}`
- **Delete User**: `DELETE /api/v1/users/{id}`

---

## ⚙️ 5. การตั้งค่าระบบ (Configurations)

### ราคาค่าบริการ (Pricing)
- **Get Config**: `GET /api/v1/service-pricing/config`
- **Add Rule**: `POST /api/v1/service-pricing/rules`

### อุปกรณ์ (Devices)
- **Get Status/Config**: `GET /api/v1/devices/config`
- **Create Device**: `POST /api/v1/devices`

### 🎨 ธีมและโลโก้ (Theme)
- **Get Theme**: `GET /api/v1/theme`
- **Update Theme**: `PUT /api/v1/theme`
  ```json
  {
    "primaryColor": "#2563eb",
    "sidebarBg": "dark",
    "logoUrl": "https://..."
  }
  ```

---

## ⚠️ การจัดการ Error (Error Handling)

API จะส่ง HTTP Status Code พร้อมข้อความ Error:
- **401 Unauthorized**: Token หมดอายุหรือไม่ได้ Login
- **400 Bad Request**: ส่งข้อมูลไม่ครบหรือผิด Format
- **404 Not Found**: ไม่พบข้อมูลที่เรียก
- **409 Conflict**: ข้อมูลที่พยายามสร้างซ้ำ (เช่น Username มีอยู่แล้ว)

---
*จัดทำโดย: ระบบช่วยเขียนโปรแกรม Antigravity AI*
