const { store } = require('../store');
const { supabase, isSupabaseEnabled } = require('../../db/supabase');
const { paginate } = require('../../utils/helpers');
const { normalizePagination, buildMeta } = require('../../utils/pagination');

function toNumberOrNull(value) {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function toTransactionApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    billNo: row.bill_no ?? row.billNo,
    plateNo: row.plate_no ?? row.plateNo,
    vehicleType: row.vehicle_type ?? row.vehicleType,
    serviceType: row.service_type ?? row.serviceType,
    entryAt: row.entry_at ?? row.entryAt,
    exitAt: row.exit_at ?? row.exitAt,
    durationMinute: row.duration_minute ?? row.durationMinute,
    amount: toNumberOrNull(row.amount),
    vat: toNumberOrNull(row.vat),
    discount: toNumberOrNull(row.discount),
    netAmount: toNumberOrNull(row.net_amount ?? row.netAmount),
    status: row.status,
    payment: row.payment || {},
    receipt: row.receipt || {},
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt
  };
}

async function listTransactions({ keyword, plateNo, billNo, status, paymentStatus, page = 1, perPage = 10 } = {}) {
  if (!isSupabaseEnabled) {
    let rows = [...store.transactions];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      rows = rows.filter((item) => [item.billNo, item.plateNo, item.serviceType].some((field) => String(field).toLowerCase().includes(kw)));
    }

    if (plateNo) rows = rows.filter((item) => item.plateNo.includes(plateNo));
    if (billNo) rows = rows.filter((item) => item.billNo.includes(billNo));
    if (status) rows = rows.filter((item) => item.status === status);
    if (paymentStatus) rows = rows.filter((item) => item.payment.status === paymentStatus);

    return paginate(rows, page, perPage);
  }

  const { page: safePage, perPage: safePerPage, from, to } = normalizePagination(page, perPage);

  let query = supabase.from('transactions').select('*', { count: 'exact' });

  if (keyword) {
    const kw = String(keyword).replace(/%/g, '\\%').replace(/_/g, '\\_');
    query = query.or(`bill_no.ilike.%${kw}%,plate_no.ilike.%${kw}%,service_type.ilike.%${kw}%`);
  }

  if (plateNo) query = query.ilike('plate_no', `%${plateNo}%`);
  if (billNo) query = query.ilike('bill_no', `%${billNo}%`);
  if (status) query = query.eq('status', status);
  if (paymentStatus) query = query.eq('payment->>status', paymentStatus);

  const { data, error, count } = await query.order('updated_at', { ascending: false }).range(from, to);
  if (error) throw error;

  return {
    data: (data || []).map(toTransactionApi),
    meta: buildMeta(safePage, safePerPage, count)
  };
}

async function listAllTransactions() {
  if (!isSupabaseEnabled) return [...store.transactions];

  const { data, error } = await supabase.from('transactions').select('*');
  if (error) throw error;
  return (data || []).map(toTransactionApi);
}

async function getTransactionById(id) {
  if (!id) return null;

  if (!isSupabaseEnabled) {
    return store.transactions.find((item) => item.id === id) || null;
  }

  const { data, error } = await supabase.from('transactions').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return toTransactionApi(data);
}

async function saveTransaction(transaction) {
  if (!transaction) return null;

  if (!isSupabaseEnabled) {
    // In-memory store keeps object references, nothing to persist.
    return transaction;
  }

  const { data, error } = await supabase
    .from('transactions')
    .update({
      bill_no: transaction.billNo,
      plate_no: transaction.plateNo,
      vehicle_type: transaction.vehicleType,
      service_type: transaction.serviceType,
      entry_at: transaction.entryAt,
      exit_at: transaction.exitAt,
      duration_minute: transaction.durationMinute,
      amount: transaction.amount,
      vat: transaction.vat,
      discount: transaction.discount,
      net_amount: transaction.netAmount,
      status: transaction.status,
      payment: transaction.payment,
      receipt: transaction.receipt
    })
    .eq('id', transaction.id)
    .select('*')
    .single();

  if (error) throw error;
  return toTransactionApi(data);
}

module.exports = {
  listTransactions,
  listAllTransactions,
  getTransactionById,
  saveTransaction
};

