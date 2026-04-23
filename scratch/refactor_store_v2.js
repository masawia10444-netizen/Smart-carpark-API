const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
const storeModule = require(storePath);
const store = storeModule.store;

// Map all transactions to the new structure
store.transactions = store.transactions.map(t => {
  if (t.payments) return t; // Already updated
  
  const oldPayment = t.payment || {};
  const isPaid = oldPayment.status === 'paid';
  
  const newT = { ...t };
  delete newT.payment;
  
  newT.payments = isPaid ? [
    {
      id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      method: oldPayment.method || 'cash',
      channel: oldPayment.channel || 'cashier',
      amount: t.netAmount || 20,
      paidAt: oldPayment.paidAt || t.updatedAt,
      expiryAt: oldPayment.paidAt || t.updatedAt,
      processedBy: oldPayment.processedBy || 'u1'
    }
  ] : [];
  
  newT.totalPaid = isPaid ? (t.netAmount || 20) : 0;
  
  return newT;
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
console.log('Successfully refactored store.js using direct object mapping.');
