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

async function runFullHealthCheck() {
  console.log('--- 🩺 STARTING FULL SYSTEM HEALTH CHECK ---');

  // 1. AUTH CHECK
  console.log('\n1. Testing Auth...');
  const login = await request('POST', '/auth/login', { username: 'admin1', password: '123' });
  if (login.status === 200) {
    console.log('✅ Login: OK');
    const token = login.data.token;
    
    const me = await request('GET', '/auth/me', null, token);
    console.log(me.status === 200 ? '✅ Auth Me: OK' : '❌ Auth Me: FAILED');
  } else {
    console.log('❌ Login: FAILED');
  }

  const token = login.data.token;

  // 2. ADMIN CORE CHECK
  console.log('\n2. Testing Admin Core APIs...');
  const dash = await request('GET', '/dashboard', null, token);
  console.log(dash.status === 200 ? '✅ Dashboard: OK' : '❌ Dashboard: FAILED');

  const tx = await request('GET', '/transactions', null, token);
  console.log(tx.status === 200 ? `✅ Transactions List: OK (${tx.data.data.length} items)` : '❌ Transactions List: FAILED');

  const devices = await request('GET', '/devices/config', null, token);
  console.log(devices.status === 200 ? '✅ Devices Config: OK' : '❌ Devices Config: FAILED');

  // 3. KIOSK SYSTEM CHECK
  console.log('\n3. Testing Kiosk System...');
  const actCode = await request('POST', '/devices/kiosks/activation-code', { name: 'Health Check Kiosk', location: 'Lab' }, token);
  if (actCode.status === 200) {
    console.log('✅ Admin Activation Code Gen: OK');
    const code = actCode.data.code;
    
    const activate = await request('POST', '/kiosk/activate', { code });
    if (activate.status === 200) {
      console.log('✅ Kiosk Activation: OK');
      const deviceId = activate.data.deviceId;
      
      const search = await request('GET', `/kiosk/search?plateNo=ทน-4383&deviceId=${deviceId}`);
      console.log(search.status === 200 ? '✅ Kiosk Search: OK' : '❌ Kiosk Search: FAILED');

      const config = await request('GET', `/kiosk/config?deviceId=${deviceId}`);
      console.log(config.status === 200 && config.data.status === 'online' ? '✅ Kiosk Config/Status: OK' : '❌ Kiosk Config/Status: FAILED');
    }
  }

  // 4. MONITOR CHECK
  console.log('\n4. Testing Kiosk Monitor...');
  const monitor = await request('GET', '/devices/kiosks', null, token);
  console.log(monitor.status === 200 && monitor.data.online > 0 ? '✅ Kiosk Monitor: OK' : '❌ Kiosk Monitor: FAILED');

  console.log('\n--- 🏁 HEALTH CHECK COMPLETED ---');
}

runFullHealthCheck();
