const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

async function testRefreshFlow() {
  console.log('--- 🛡️ Testing Refresh Token Flow ---');
  
  try {
    // 1. Login
    console.log('1. Logging in...');
    const loginData = JSON.stringify({ username: 'admin1', password: '123' });
    const loginRes = await new Promise((resolve) => {
      const req = http.request(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.write(loginData);
      req.end();
    });

    const { token, refreshToken } = loginRes;
    console.log('✅ Logged in! Refresh Token:', refreshToken);

    // 2. Refresh
    console.log('2. Attempting to Refresh...');
    const refreshData = JSON.stringify({ refreshToken });
    const refreshRes = await new Promise((resolve) => {
      const req = http.request(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => resolve(JSON.parse(body)));
      });
      req.write(refreshData);
      req.end();
    });

    console.log('--- 🏁 Final Result ---');
    console.log(JSON.stringify(refreshRes, null, 2));

    if (refreshRes.token) {
      console.log('🚀 SUCCESS: New token received!');
    } else {
      console.log('❌ FAILED: Refresh failed.');
    }

  } catch (err) {
    console.error('❌ Error during test:', err.message);
  }
}

testRefreshFlow();
