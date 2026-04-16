const { store, createId } = require('../store');
const { supabase, isSupabaseEnabled } = require('../../db/supabase');
const { paginate, pick } = require('../../utils/helpers');
const { normalizePagination, buildMeta } = require('../../utils/pagination');

function toUserApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    password: row.password,
    name: row.name,
    email: row.email ?? null,
    role: row.role,
    permissions: row.permissions || [],
    status: row.status,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt
  };
}

function withoutPassword(user) {
  if (!user) return null;
  const safe = { ...user };
  delete safe.password;
  return safe;
}

async function listUsers({ keyword, page = 1, perPage = 10 } = {}) {
  if (!isSupabaseEnabled) {
    let rows = [...store.users].map(withoutPassword);
    if (keyword) {
      const kw = String(keyword).toLowerCase();
      rows = rows.filter((item) => [item.name, item.email, item.username, item.role].some((field) => String(field || '').toLowerCase().includes(kw)));
    }
    return paginate(rows, page, perPage);
  }

  const { page: safePage, perPage: safePerPage, from, to } = normalizePagination(page, perPage);

  let query = supabase
    .from('users')
    .select('id,username,name,email,role,permissions,status,created_at,updated_at', { count: 'exact' });

  if (keyword) {
    const kw = String(keyword).replace(/%/g, '\\%').replace(/_/g, '\\_');
    query = query.or(`name.ilike.%${kw}%,email.ilike.%${kw}%,username.ilike.%${kw}%,role.ilike.%${kw}%`);
  }

  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);
  if (error) throw error;

  return {
    data: (data || []).map((row) => withoutPassword(toUserApi(row))),
    meta: buildMeta(safePage, safePerPage, count)
  };
}

async function findActiveUserByCredentials(username, password) {
  if (!username || !password) return null;

  if (!isSupabaseEnabled) {
    return store.users.find((item) => item.username === username && item.password === password && item.status === 'active') || null;
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return toUserApi(data);
}

async function getUserById(id) {
  if (!id) return null;

  if (!isSupabaseEnabled) {
    return store.users.find((item) => item.id === id) || null;
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return toUserApi(data);
}

async function isUsernameTaken(username, { excludeId } = {}) {
  if (!username) return false;

  if (!isSupabaseEnabled) {
    return store.users.some((item) => item.username === username && (!excludeId || item.id !== excludeId));
  }

  let query = supabase.from('users').select('id').eq('username', username).limit(1);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

async function createUser(payload) {
  const user = {
    id: createId('u'),
    username: payload.username,
    password: payload.password,
    name: payload.name,
    email: payload.email || null,
    role: payload.role || 'staff',
    permissions: payload.permissions || [],
    status: payload.status || 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!isSupabaseEnabled) {
    store.users.push(user);
    return withoutPassword(user);
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      id: user.id,
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      status: user.status
    })
    .select('*')
    .single();

  if (error) throw error;
  return withoutPassword(toUserApi(data));
}

async function updateUser(id, patch = {}) {
  const existing = await getUserById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...pick(patch, ['username', 'password', 'name', 'email', 'role', 'permissions', 'status']),
    updatedAt: new Date().toISOString()
  };

  if (!isSupabaseEnabled) {
    Object.assign(existing, updated);
    return withoutPassword(existing);
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      username: updated.username,
      password: updated.password,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      permissions: updated.permissions,
      status: updated.status
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return withoutPassword(toUserApi(data));
}

async function deleteUser(id) {
  const existing = await getUserById(id);
  if (!existing) return null;

  if (!isSupabaseEnabled) {
    const index = store.users.findIndex((item) => item.id === id);
    const [removed] = store.users.splice(index, 1);
    return withoutPassword(removed);
  }

  const { data, error } = await supabase.from('users').delete().eq('id', id).select('*').single();
  if (error) throw error;
  return withoutPassword(toUserApi(data));
}

module.exports = {
  listUsers,
  findActiveUserByCredentials,
  getUserById,
  isUsernameTaken,
  createUser,
  updateUser,
  deleteUser
};
