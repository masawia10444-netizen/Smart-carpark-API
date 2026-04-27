const http = require('http');

const API_BASE = 'http://localhost:8080/api/v1';

async function verifyTransaction() {
  console.log('--- 🛡️ Verifying Bill today_1 ---');
  
  try {
    // 1. Get Token
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

    const token = loginRes.token;
    const headers = { Authorization: `Bearer ${token}` };

    // 2. GET /transactions/today_1
    const ticket = await new Promise((resolve) => {
      http.get(`${API_BASE}/transactions/today_1`, { headers }, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => resolve(JSON.parse(body)));
      });
    });

    console.log('🔍 LIVE RESULT FROM API:');
    console.log(JSON.stringify(ticket, null, 2));

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

verifyTransaction();
