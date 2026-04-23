const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
let content = fs.readFileSync(storePath, 'utf8');

// Add pricingConfig if it doesn't exist
if (!content.includes('pricingConfig')) {
  const pricingConfigStr = `  pricingConfig: {
    pricingRules: [
      { id: 'pr1', serviceType: 'parking', vehicleType: 'car', hourStart: 1, hourEnd: 1, price: 0, status: 'active' },
      { id: 'pr2', serviceType: 'parking', vehicleType: 'car', hourStart: 2, hourEnd: 3, price: 10, status: 'active' },
      { id: 'pr3', serviceType: 'parking', vehicleType: 'car', hourStart: 4, hourEnd: 999, price: 20, status: 'active' }
    ]
  },`;
  
  content = content.replace('const store = {', `const store = {\n${pricingConfigStr}`);
  fs.writeFileSync(storePath, content);
  console.log('Successfully added pricingConfig to store.js');
}
