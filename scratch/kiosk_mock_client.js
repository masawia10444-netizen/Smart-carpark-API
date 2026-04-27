const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';
const DEVICE_ID = 'KIOSK-GATE-01';

async function post(path, data) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const req = http.request(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.write(payload);
    req.end();
  });
}

async function get(path, token = null) {
  return new Promise((resolve) => {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    http.get(`${API_BASE}${path}`, { headers }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
  });
}

async function runKioskFlow() {
  console.log('--- 🚀 START KIOSK MOCK FLOW ---');

  // 1. Check-in (ตู้รายงานตัว)
  console.log('\n1️⃣ Kiosk Checking-in...');
  const checkin = await post('/kiosk/check-in', {
    deviceId: DEVICE_ID,
    name: 'Main Entrance Kiosk',
    location: 'Gate A',
    version: '2.1.0'
  });
  console.log('Result:', checkin.data.message);

  // 2. Search Plate (ลูกค้าพิมพ์ทะเบียน)
  console.log('\n2️⃣ Searching for Plate: ทน-4383...');
  const search = await get(`/kiosk/search?plateNo=ทน-4383&deviceId=${DEVICE_ID}`);
  const ticket = search.data.items[0];
  console.log(`Found Bill: ${ticket.billNo} | Current Fee: ${ticket.netAmount} THB`);

  // 3. Payment (จำลองการจ่ายเงินหน้าตู้)
  console.log('\n3️⃣ Processing E-Payment for 2190 THB...');
  const pay = await post('/kiosk/payment', {
    transactionId: ticket.id,
    method: 'qr_code',
    amount: ticket.netAmount,
    deviceId: DEVICE_ID
  });
  console.log('Result:', pay.data.message);
  console.log('Exit Time Limit Set:', pay.data.transaction.exitTimeLimit);

  // 4. Admin Monitor (แอบไปดูว่าตู้โชว์ใน Monitor ไหม)
  console.log('\n4️⃣ Admin Checking Kiosk Monitor...');
  // ต้องล็อกอินก่อน
  const login = await post('/auth/login', { username: 'admin1', password: '123' });
  const monitor = await get('/devices/kiosks', login.data.token);
  console.log('Current Online Kiosks:', monitor.data.online);
  console.log('Kiosk List:', JSON.stringify(monitor.data.kiosks, null, 2));

  console.log('\n--- ✅ KIOSK FLOW COMPLETED ---');
}

runKioskFlow();
