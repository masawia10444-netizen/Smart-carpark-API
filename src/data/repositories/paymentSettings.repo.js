const { store } = require('../store');

// Initial setup if not exists in store
if (!store.paymentSettings) {
  store.paymentSettings = {
    methods: [
      { id: 'cash', label: 'แคเชียร์ (เงินสด)', icon: 'cash', isActive: true },
      { id: 'bank1', label: 'ธนาคาร 1', icon: 'bank', isActive: true },
      { id: 'bank2', label: 'ธนาคาร 2', icon: 'bank', isActive: true },
      { id: 'qr_scan', label: 'สแกนจ่าย', icon: 'qr', isActive: true },
      { id: 'wallet', label: 'วอลเล็ต', icon: 'wallet', isActive: true },
      { id: 'other', label: 'อื่นๆ', icon: 'more', isActive: true }
    ],
    channels: [
      { 
        id: 'ch_cashier', 
        name: 'แคเชียร์', 
        icon: 'user', 
        allowedMethods: ['cash', 'qr_scan', 'bank1', 'bank2', 'wallet', 'other'] 
      },
      { 
        id: 'ch_kiosk', 
        name: 'Kiosk', 
        icon: 'vending', 
        allowedMethods: ['bank1', 'bank2'] 
      },
      { 
        id: 'ch_scan', 
        name: 'สแกนจ่าย', 
        icon: 'qr', 
        allowedMethods: ['qr_scan', 'wallet'] 
      },
      { 
        id: 'ch_gate', 
        name: 'Exit Gate', 
        icon: 'gate', 
        allowedMethods: ['cash', 'wallet'] 
      }
    ]
  };
}

async function listMethods() {
  return store.paymentSettings.methods;
}

async function updateMethod(id, updates) {
  const index = store.paymentSettings.methods.findIndex(m => m.id === id);
  if (index === -1) return null;
  
  store.paymentSettings.methods[index] = {
    ...store.paymentSettings.methods[index],
    ...updates
  };
  return store.paymentSettings.methods[index];
}

async function listChannels() {
  return store.paymentSettings.channels;
}

async function updateChannelMapping(id, allowedMethods) {
  const index = store.paymentSettings.channels.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  if (!Array.isArray(allowedMethods)) return null;

  store.paymentSettings.channels[index].allowedMethods = allowedMethods;
  return store.paymentSettings.channels[index];
}

module.exports = {
  listMethods,
  updateMethod,
  listChannels,
  updateChannelMapping
};
