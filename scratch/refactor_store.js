const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
let content = fs.readFileSync(storePath, 'utf8');

// Replace all "payment": { ... } blocks with "payments": [ { ... } ] and add totalPaid
// This is a bit complex via regex, so let's do a more robust string replacement for the structure
content = content.replace(/"payment":\s*{[\s\S]*?"processedBy":\s*"(.*?)"\s*}/g, (match, adminId) => {
    // Extract everything inside { }
    const inner = match.substring(match.indexOf('{'), match.lastIndexOf('}') + 1);
    const obj = JSON.parse(inner);
    const amount = 20; // Default mock amount
    return `"payments": [ 
      {
        "id": "pay_initial",
        "method": "${obj.method || 'cash'}",
        "channel": "${obj.channel || 'cashier'}",
        "amount": ${amount},
        "paidAt": "${obj.paidAt}",
        "expiryAt": "${obj.paidAt}",
        "processedBy": "${adminId}"
      }
    ],
    "totalPaid": ${amount}`;
});

// For pending ones that don't have processedBy yet
content = content.replace(/"payment":\s*{\s*"status":\s*"unpaid"[\s\S]*?}/g, `"payments": [], "totalPaid": 0`);

fs.writeFileSync(storePath, content);
console.log('Successfully refactored store.js to Multi-Payment structure.');
