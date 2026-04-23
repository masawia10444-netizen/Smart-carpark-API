const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'src', 'data', 'store.js');
let content = fs.readFileSync(storePath, 'utf8');

const mockMembers = `  users: [
    { id: 'u1', firstName: 'วิชัย', lastName: 'มั่นคง', name: 'วิชัย มั่นคง', email: 'wichai@example.com', phone: '083-456-7890', role: 'super_admin', position: 'ผู้จัดการ', status: 'active', permissions: ['dashboard', 'check', 'total', 'members', 'pricing', 'devices', 'theme', 'system'], createdAt: new Date().toISOString() },
    { id: 'u2', firstName: 'สมชาย', lastName: 'ใจดี', name: 'สมชาย ใจดี', email: 'somchai@example.com', phone: '082-345-6789', role: 'staff', position: 'แคชเชียร์', status: 'inactive', permissions: ['dashboard', 'check'], createdAt: new Date().toISOString() },
    { id: 'u3', firstName: 'สมหญิง', lastName: 'รักงาน', name: 'สมหญิง รักงาน', email: 'somying@example.com', phone: '081-234-5678', role: 'staff', position: 'แอดมิน', status: 'active', permissions: ['dashboard', 'check', 'total'], createdAt: new Date().toISOString() },
    { id: 'u4', firstName: 'นิภา', lastName: 'สุขใจ', name: 'นิภา สุขใจ', email: 'nipa@example.com', phone: '084-567-8901', role: 'staff', position: 'ผู้ดูแลระบบ', status: 'active', permissions: ['dashboard', 'check', 'total', 'members'], createdAt: new Date().toISOString() },
    { id: 'admin1', firstName: 'Admin', lastName: 'Parking', name: 'Admin Parking', email: 'admin@carpark.com', password: 'admin', role: 'super_admin', position: 'CEO', status: 'active', permissions: ['dashboard', 'check', 'total', 'members', 'pricing', 'devices', 'theme', 'system'], createdAt: new Date().toISOString() }
  ],`;

// Replace the existing users array
content = content.replace(/users:\s*\[[\s\S]*?\],/, mockMembers);

fs.writeFileSync(storePath, content);
console.log('Mock members injected into store.js');
