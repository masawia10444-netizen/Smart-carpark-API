const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
const storeModule = require(storePath);
const store = storeModule.store;
const transactions = store.transactions;

const admins = ['u1', 'u4']; // admin1, cashier

let updatedCount = 0;
transactions.forEach(t => {
  if (t.id.startsWith('today_') && t.payment.status === 'paid' && t.payment.method === 'cash') {
    t.payment.processedBy = admins[updatedCount % admins.length];
    updatedCount++;
  }
});

// Update the file
const newStoreContent = `const { v4: uuidv4 } = require('uuid');

const nowIso = new Date().toISOString();

const store = ${JSON.stringify(store, null, 2)};

function createId(prefix) {
  return \`\${prefix}_\${uuidv4().split('-')[0]}\`;
}

module.exports = { store, createId };
`;

fs.writeFileSync(storePath, newStoreContent);
console.log(`Updated ${updatedCount} today's transactions with processedBy admin IDs.`);
