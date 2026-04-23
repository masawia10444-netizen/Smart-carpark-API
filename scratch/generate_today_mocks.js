const fs = require('fs');
const path = require('path');

// Configuration
const COUNT = 50;
const TODAY_STR = '2026-04-23';

function generateTodayMocks() {
  const transactions = [];
  const channels = ['cashier', 'mobile', 'kiosk', 'gate'];
  const methods = ['cash', 'qr', 'epay'];

  for (let i = 1; i <= COUNT; i++) {
    const id = `today_${i}`;
    const billNo = `PK20260423${String(i).padStart(4, '0')}`;
    const hour = Math.floor(Math.random() * 8) + 8; // 08:00 - 15:59
    const minute = Math.floor(Math.random() * 60);
    const entryAt = `${TODAY_STR}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+07:00`;
    
    const isPaid = Math.random() > 0.3; // 70% paid
    const status = isPaid ? 'completed' : 'pending';
    const amount = (Math.floor(Math.random() * 5) + 1) * 20; // 20, 40, 60, 80, 100
    
    let payment = { status: isPaid ? 'paid' : 'unpaid', method: null, channel: null, paidAt: null };
    
    if (isPaid) {
      const channel = channels[Math.floor(Math.random() * channels.length)];
      const method = channel === 'cashier' ? 'cash' : (Math.random() > 0.5 ? 'qr' : 'epay');
      const paidHour = hour + 1;
      const paidMinute = (minute + 15) % 60;
      payment = {
        status: 'paid',
        method,
        channel,
        paidAt: `${TODAY_STR}T${String(paidHour).padStart(2, '0')}:${String(paidMinute).padStart(2, '0')}:00.000Z`
      };
    }

    transactions.push({
      id,
      billNo,
      plateNo: `ทน-${Math.floor(Math.random() * 9000) + 1000}`,
      vehicleType: 'car',
      serviceType: 'parking',
      entryAt,
      exitAt: isPaid ? payment.paidAt : null,
      amount,
      vat: 0,
      discount: 0,
      netAmount: amount,
      status,
      payment,
      createdAt: entryAt,
      updatedAt: isPaid ? payment.paidAt : entryAt
    });
  }
  return transactions;
}

const newTxs = generateTodayMocks();
const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
let content = fs.readFileSync(storePath, 'utf8');

// Find the transactions array start
const txStartRegex = /transactions: \[/;
const match = content.match(txStartRegex);

if (match) {
  const insertPos = match.index + match[0].length;
  const jsonStr = JSON.stringify(newTxs, null, 2).slice(1, -1); // Remove outer [ ]
  const updatedContent = content.slice(0, insertPos) + jsonStr + ',' + content.slice(insertPos);
  fs.writeFileSync(storePath, updatedContent);
  console.log(`Successfully injected ${COUNT} today's transactions.`);
} else {
  console.error('Could not find transactions array in store.js');
}
