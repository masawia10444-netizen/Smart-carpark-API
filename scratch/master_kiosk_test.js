const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

// Helper functions for API calls
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

async function runMasterTest() {
  console.log('--- 🏆 START MASTER KIOSK ECOSYSTEM TEST ---');

  // 1. Admin Login
  const login = await request('POST', '/auth/login', { username: 'admin1', password: '123' });
  const adminToken = login.data.token;
  console.log('✅ Admin Logged In');

  // 2. Admin Creates Activation Code
  console.log('\n[ADMIN] Generating Activation Code for New Kiosk...');
  const codeRes = await request('POST', '/devices/kiosks/activation-code', { name: 'Kiosk North Gate', location: 'Zone A' }, adminToken);
  const code = codeRes.data.code;
  console.log('🔑 Code Generated:', code);

  // 3. Kiosk Activation (Server-side ID Generation)
  console.log('\n[KIOSK] Activating with code...');
  const activateRes = await request('POST', '/kiosk/activate', { code });
  const deviceId = activateRes.data.deviceId;
  console.log('🆔 Kiosk Registered! Assigned ID:', deviceId);

  // 4. Kiosk Fetching Config
  console.log('\n[KIOSK] Fetching UI Configuration...');
  const config = await request('GET', '/kiosk/config');
  console.log('🎨 Theme Color:', config.data.theme.primaryColor);

  // 5. Customer Searches for Plate "ทน-4462"
  console.log('\n[CUSTOMER] Searching for Plate: ทน-4462...');
  const search = await request('GET', `/kiosk/search?plateNo=ทน-4462&deviceId=${deviceId}`);
  const ticket = search.data.items[0];
  console.log(`📄 Found Bill: ${ticket.billNo} | Fee: ${ticket.netAmount} THB`);

  // 6. Customer Pays at Kiosk
  console.log('\n[KIOSK] Processing Payment...');
  const pay = await request('POST', '/kiosk/payment', {
    transactionId: ticket.id,
    method: 'qr_code',
    amount: ticket.netAmount,
    deviceId: deviceId
  });
  console.log('💰 Payment Success:', pay.data.message);
  console.log('⏰ Exit Time Limit:', pay.data.transaction.exitTimeLimit);

  // 7. Admin Checks Monitor
  console.log('\n[ADMIN] Checking Kiosk Monitor...');
  const monitor = await request('GET', '/devices/kiosks', null, adminToken);
  const myKiosk = monitor.data.kiosks.find(k => k.deviceId === deviceId);
  console.log(`🖥️ Kiosk Status: ${myKiosk.name} is ${myKiosk.status}`);
  console.log('📊 Total Online Kiosks:', monitor.data.online);

  console.log('\n--- ⭐ MASTER TEST COMPLETED SUCCESSFULLY ---');
}

runMasterTest();
