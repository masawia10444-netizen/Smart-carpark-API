const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

async function post(path, data, token = null) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const req = http.request(`${API_BASE}${path}`, {
      method: 'POST',
      headers
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.write(payload);
    req.end();
  });
}

async function put(path, data, token = null) {
  return new Promise((resolve) => {
    const payload = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const req = http.request(`${API_BASE}${path}`, {
      method: 'PUT',
      headers
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.write(payload);
    req.end();
  });
}

async function del(path, token = null) {
  return new Promise((resolve) => {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const req = http.request(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers
    }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
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

async function runServiceDemo() {
  console.log('--- 🛡️ START KIOSK SERVICE DEMO ---');

  // 1. Admin ล็อกอินก่อน
  const login = await post('/auth/login', { username: 'admin1', password: '123' });
  const adminToken = login.data.token;

  // 2. Admin ออกรหัส Activation Code สำหรับตู้ใหม่
  console.log('\n1️⃣ Admin generating Activation Code...');
  const adminCodeRes = await post('/devices/kiosks/activation-code', {
    name: 'Kiosk Lobby Floor 1',
    location: 'Main Lobby'
  }, adminToken);
  const code = adminCodeRes.data.code;
  console.log(`Generated Code: ${code} (Expires in 1 hour)`);

  // 3. Kiosk นำรหัสไป Activate ตัวเอง (ไม่ต้องส่ง deviceId ไปแล้ว)
  console.log('\n2️⃣ Kiosk Activating with code...');
  const activateRes = await post('/kiosk/activate', {
    code: code
  });
  const deviceId = activateRes.data.deviceId;
  console.log('Result:', activateRes.data.success ? `Success! Got Device ID: ${deviceId}` : 'Failed');

  // 4. Kiosk ดึง Config ไปใช้
  console.log('\n3️⃣ Kiosk fetching Configuration...');
  const configRes = await get('/kiosk/config');
  console.log('Theme Color:', configRes.data.theme.primaryColor);
  console.log('System Name:', configRes.data.systemName);

  // 5. Admin ตรวจสอบสถานะตู้ใน Monitor
  console.log('\n4️⃣ Admin checking Monitor...');
  const monitor = await get('/devices/kiosks', adminToken);
  console.log('Online Kiosks:', monitor.data.online);
  console.log('Active Kiosk:', monitor.data.kiosks[0].name, `(${monitor.data.kiosks[0].status})`);

  // 5. Admin แก้ไขข้อมูลตู้
  console.log('\n5️⃣ Admin Editing Kiosk (Moving to Floor 2)...');
  const editRes = await put(`/devices/kiosks/${deviceId}`, {
    name: 'Kiosk Lobby Floor 2',
    location: 'Near Elevator'
  }, adminToken);
  console.log('Result:', editRes.data.success ? 'Kiosk Updated' : 'Failed');
  console.log('New Name:', editRes.data.kiosk.name);

  // 6. Admin ลบตู้
  console.log('\n6️⃣ Admin Deleting Kiosk...');
  const deleteRes = await del(`/devices/kiosks/${deviceId}`, adminToken);
  console.log('Result:', deleteRes.data.success ? 'Kiosk Removed' : 'Failed');

  // เช็ค Monitor อีกครั้ง
  const finalMonitor = await get('/devices/kiosks', adminToken);
  console.log('Final Kiosk Count:', finalMonitor.data.total);

  console.log('\n--- ✅ SERVICE DEMO COMPLETED ---');
}

runServiceDemo();
