const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

const request = (method, path, data, token = null) => {
  return new Promise((resolve) => {
    const payload = data ? JSON.stringify(data) : '';
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const req = http.request(`${API_BASE}${path}`, { method, headers }, (res) => {
      let body = '';
      res.on('data', (d) => body += d);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch(e) { resolve({ status: res.statusCode, data: body }); }
      });
    });
    if (payload) req.write(payload);
    req.end();
  });
};

async function runMaintenanceTest() {
  console.log('--- 🛠️ START KIOSK MAINTENANCE TEST ---');

  // 1. Admin Login
  const login = await request('POST', '/auth/login', { username: 'admin1', password: '123' });
  const adminToken = login.data.token;

  // 2. Admin ออกรหัสและตู้ลงทะเบียน
  const codeRes = await request('POST', '/devices/kiosks/activation-code', { name: 'Faulty Kiosk', location: 'Basement' }, adminToken);
  const code = codeRes.data.code;
  const activateRes = await request('POST', '/kiosk/activate', { code });
  const deviceId = activateRes.data.deviceId;
  console.log(`✅ Kiosk Registered: ${deviceId}`);

  // 3. ลองดึง Config (ควรได้ status: online)
  const config1 = await request('GET', `/kiosk/config?deviceId=${deviceId}`);
  console.log('Current Status:', config1.data.status);

  // 4. แอดมินสั่ง MAINTENANCE!
  console.log('\n🚨 [ADMIN] Setting Kiosk to MAINTENANCE mode...');
  await request('PUT', `/devices/kiosks/${deviceId}`, { status: 'maintenance' }, adminToken);

  // 5. ลองดึง Config ใหม่ (ตู้ต้องรู้ตัวแล้ว)
  const config2 = await request('GET', `/kiosk/config?deviceId=${deviceId}`);
  console.log('New Status:', config2.data.status);
  if (config2.data.status === 'maintenance') {
    console.log('🖥️ [KIOSK UI] Showing "Under Maintenance" screen...');
  }

  // 6. ลูกค้าพยายามจ่ายเงิน (ต้องโดนบล็อก)
  console.log('\n💰 [CUSTOMER] Trying to pay at this faulty kiosk...');
  const payRes = await request('POST', '/kiosk/payment', {
    transactionId: 'today_1',
    method: 'qr_code',
    amount: 100,
    deviceId: deviceId
  });
  
  if (payRes.status === 403) {
    console.log('❌ Payment Blocked by Server:', payRes.data.message);
  } else {
    console.log('⚠️ Error: Payment should have been blocked!');
  }

  console.log('\n--- ✅ MAINTENANCE TEST COMPLETED ---');
}

runMaintenanceTest();
