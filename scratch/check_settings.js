const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

async function checkSettings() {
  console.log('--- 🛡️ Checking System Settings API ---');
  
  try {
    // 1. Get Token
    const loginData = JSON.stringify({ username: 'admin1', password: '123' });
    const loginRes = await new Promise((resolve, reject) => {
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

    const token = loginRes.token;
    const headers = { Authorization: `Bearer ${token}` };

    // 2. GET /system-settings
    const settings = await new Promise((resolve, reject) => {
      http.get(`${API_BASE}/system-settings`, { headers }, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => resolve(JSON.parse(body)));
      });
    });

    console.log('✅ Full System Settings JSON:', JSON.stringify(settings, null, 2));
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkSettings();
