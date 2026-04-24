const { store, createId } = require('../store');

function toMemberApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    firstName: row.firstName || '',
    lastName: row.lastName || '',
    email: row.email,
    phone: row.phone || '',
    role: row.role,
    status: row.status,
    permissions: row.permissions || [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

async function listMembers({ keyword, status, role } = {}) {
  let rows = [...store.users].filter(u => u.role !== 'system'); // Exclude system accounts if any

  if (keyword) {
    const kw = keyword.toLowerCase();
    rows = rows.filter(r =>
      (r.name && r.name.toLowerCase().includes(kw)) ||
      (r.email && r.email.toLowerCase().includes(kw)) ||
      (r.phone && r.phone.includes(kw))
    );
  }

  if (status) rows = rows.filter(r => r.status === status);
  if (role) rows = rows.filter(r => r.role === role);

  return rows.map(toMemberApi);
}

async function getMemberStats() {
  const all = store.users.length;
  const active = store.users.filter(u => u.status === 'active').length;
  const admins = store.users.filter(u => u.role === 'super_admin').length;

  return {
    totalMembers: all,
    activeMembers: active,
    totalAdmins: admins
  };
}

async function createMember(data) {
  const newMember = {
    id: createId('u'),
    username: data.username || data.email?.split('@')[0] || createId('user'), // Fallback to email prefix or random ID
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
    email: data.email,
    password: data.password || '123456',
    phone: data.phone,
    role: data.role || 'staff',
    status: 'active',
    permissions: data.permissions || ['dashboard', 'check'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.users.push(newMember);
  return toMemberApi(newMember);
}

async function updateMember(id, data) {
  const index = store.users.findIndex(u => u.id === id);
  if (index === -1) return null;

  const updated = {
    ...store.users[index],
    ...data,
    name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : store.users[index].name,
    updatedAt: new Date().toISOString()
  };

  store.users[index] = updated;
  return toMemberApi(updated);
}

async function deleteMember(id) {
  const index = store.users.findIndex(u => u.id === id);
  if (index === -1) return false;
  store.users.splice(index, 1);
  return true;
}

module.exports = {
  listMembers,
  getMemberStats,
  createMember,
  updateMember,
  deleteMember
};
