# Smart Carpark System Manual (คู่มือระบบ)

คู่มือนี้สรุปโครงสร้างและการทำงานของระบบ Smart Carpark API เพื่อใช้เป็นมาตรฐานในการพัฒนาต่อยอดและใช้งานในระดับโปรดักชัน

## 1. สถาปัตยภาพระบบ (Architecture)
ระบบถูกออกแบบมาเป็น **Micro-Controller Pattern** โดยใช้ Node.js + Express:
- **Routes**: จัดการทางเข้าของ API แยกตามหมวดหมู่เมนู
- **Repositories**: จัดการตรรกะทางธุรกิจ (Business Logic) และการเข้าถึงข้อมูล
- **Store**: ศูนย์กลางข้อมูล In-memory (Mock) ที่รองรับการสลับไปใช้ Supabase (Postgres) ได้ทันที

---

## 2. ระบบความปลอดภัย (Security & Authorization)
ระบบใช้กลไกการรับสิทธิ์ 2 ระดับ:
1.  **Role-Based Access Control (RBAC)**:
    - `super_admin`: เข้าถึงได้ทุกฟังก์ชัน รวมถึงการจัดการสมาชิก
    - `staff`: เข้าถึงได้เฉพาะฟังก์ชันที่ได้รับอนุญาต
2.  **Granular Permissions**: ตรวจสอบสิทธิ์รายเมนูผ่าน Middleware `authorize(['super_admin', 'staff'], 'permission_key')`
    - สิทธิ์ที่มีในระบบ: `dashboard`, `transactions`, `overview`, `pricing`, `devices`, `theme`, `settings`

---

## 3. ระบบคำนวณราคาและเวลา (Pricing Engine)
ระบบจะคำนวณค่าบริการตามเวลาจริง โดยมีตรรกะพิเศษคือ:
- **Automatic Cutoff**: หากชำระเงินสำเร็จแล้ว ระบบจะล็อคยอดเงินไว้ที่เวลาจ่ายล่าสุด แม้รถจะยังไม่ขับออก
- **Grace Period (เวลาผ่อนปรน)**: หลังจ่ายเงิน ลูกค้าจะมีเวลาออกจากลานจอดตามที่ตั้งค่าไว้ (เช่น 15 นาที) ตามที่ระบุใน `exitTimeLimit`
- **Overstay Detection**: หากรถขับออกเลยเวลา `exitTimeLimit` ระบบจะปรับสถานะบิลเป็น `partially_paid` และคำนวณราคาเพิ่มโดยอัตโนมัติ

---

## 4. การจัดการใบเสร็จ (Receipt Configuration)
แอดมินสามารถกำหนดสิทธิ์การแสดงผลในใบแจ้งหนี้ผ่าน API ตั้งค่าระบบ:
- **Entry Bill**: เลือกแสดง/ซ่อน วันที่, เวลาเข้า, QR, และรหัสบิล
- **Payment Bill**: เลือกแสดงข้อมูลการจ่ายเงิน และสำคัญที่สุดคือการแสดง **"เวลาหมดอายุ (Expiry Time)"**

---

## 5. แผนการทดสอบ (Validation Guide)
เพื่อความมั่นใจ ระบบได้ผ่านการทดสอบดังนี้:
- **API Lockdown**: ลองยิง API จาก Postman ด้วย ID พนักงานที่ไม่มีสิทธิ์ ผลลัพธ์ต้องคืนค่า `403 Forbidden`
- **Payment Logic**: ทดสอบจ่ายเงินที่ช่องทาง `gate` ระบบต้องบันทึกเวลาออก (`exitAt`) ทันทีโดยไม่มี Grace Period
- **Store Sync**: ตรวจสอบความถูกต้องของตัวแปรระหว่าง `camelCase` และ `snake_case`

---

*จัดทำโดย: Antigravity Assistant*
