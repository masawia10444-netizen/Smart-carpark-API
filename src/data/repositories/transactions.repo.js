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
  const entryAt = row.entry_at ?? row.entryAt;
  const exitAt = row.exit_at ?? row.exitAt;
  
  let serviceDisplay = '';
  if (entryAt) {
    const entryDate = new Date(entryAt);
    const endDate = exitAt ? new Date(exitAt) : new Date();
    
    // 1. Format Date: DD-MM-YYYY
    const day = String(entryDate.getDate()).padStart(2, '0');
    const month = String(entryDate.getMonth() + 1).padStart(2, '0');
    const year = entryDate.getFullYear();
    const dateFormatted = `${day}-${month}-${year}`;

    // 2. Calculate Duration
    const diffMs = endDate - entryDate;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // 3. Combine: DD-MM-YYYY : H : m
    serviceDisplay = `${dateFormatted} : ${diffHrs} : ${diffMins}`;

    // 4. Overstay Logic (Barred for future use)
    const isOverstay = row.status === 'pending' && diffHrs >= 72;
    const fineAmount = 0; // Future: if (isOverstay) fineAmount = 2000;

    return {
      id: row.id,
      billNo: row.bill_no ?? row.billNo,
      plateNo: row.plate_no ?? row.plateNo,
      vehicleType: row.vehicle_type ?? row.vehicleType,
      serviceType: row.service_type ?? row.serviceType,
      entryAt,
      serviceDisplay,
      exitAt,
      durationMinute: Math.floor(diffMs / (1000 * 60)),
      hours: diffHrs,
      minutes: diffMins,
      isOverstay,
      fineAmount,
      amount: toNumberOrNull(row.amount),
      vat: toNumberOrNull(row.vat),
      discount: toNumberOrNull(row.discount),
      netAmount: toNumberOrNull(row.net_amount ?? row.netAmount),
      status: row.status,
      statusLabel: row.status === 'pending' ? 'รอชำระ' : row.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก',
      payment: {
        ...(row.payment || {}),
        channel: row.payment?.channel ?? row.payment_channel,
        processedBy: row.payment?.processedBy ?? row.payment_processed_by
      },
      receipt: row.receipt || {},
      createdAt: row.created_at ?? row.createdAt,
      updatedAt: row.updated_at ?? row.updatedAt
    };
  }

  return {
    id: row.id,
    billNo: row.billNo,
    plateNo: row.plateNo,
    status: row.status,
    // ... basic mapping if no entryAt
  };
}

async function listTransactions({ keyword, plateNo, billNo, status, paymentStatus, startDate, endDate, excludeOverstay, page = 1, perPage = 10 } = {}) {
  if (!isSupabaseEnabled) {
    let rows = [...store.transactions].map(toTransactionApi);

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      rows = rows.filter((item) => [item.billNo, item.plateNo, item.serviceType].some((field) => String(field).toLowerCase().includes(kw)));
    }

    if (plateNo) rows = rows.filter((item) => item.plateNo.includes(plateNo));
    if (billNo) rows = rows.filter((item) => item.billNo.includes(billNo));
    if (status) rows = rows.filter((item) => item.status === status);
    if (paymentStatus) rows = rows.filter((item) => item.payment.status === paymentStatus);
    if (excludeOverstay) rows = rows.filter((item) => !item.isOverstay);

    if (startDate) {
      rows = rows.filter((item) => new Date(item.entryAt) >= new Date(startDate));
    }
    if (endDate) {
      rows = rows.filter((item) => new Date(item.entryAt) <= new Date(endDate));
    }

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

  if (startDate) query = query.gte('entry_at', startDate);
  if (endDate) query = query.lte('entry_at', endDate);

  const { data, error, count } = await query.order('updated_at', { ascending: false }).range(from, to);
  if (error) throw error;

  return {
    data: (data || []).map(toTransactionApi),
    meta: buildMeta(safePage, safePerPage, count)
  };
}

async function listAllTransactions({ startDate, endDate } = {}) {
  if (!isSupabaseEnabled) {
    let rows = [...store.transactions];
    if (startDate) {
      rows = rows.filter((item) => new Date(item.entryAt) >= new Date(startDate));
    }
    if (endDate) {
      rows = rows.filter((item) => new Date(item.entryAt) <= new Date(endDate));
    }
    return rows;
  }

  let query = supabase.from('transactions').select('*');
  if (startDate) query = query.gte('entry_at', startDate);
  if (endDate) query = query.lte('entry_at', endDate);

  const { data, error } = await query;
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

async function updateTransaction(id, updates) {
  if (!id) return null;

  if (!isSupabaseEnabled) {
    const index = store.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    // Map API fields back to internal structure if needed
    const updated = { 
      ...store.transactions[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    store.transactions[index] = updated;
    return updated;
  }

  // Handle Supabase mapping for updates
  const dbUpdates = {
    bill_no: updates.billNo,
    plate_no: updates.plateNo,
    vehicle_type: updates.vehicleType,
    service_type: updates.serviceType,
    status: updates.status,
    payment: updates.payment,
    updated_at: new Date().toISOString()
  };

  // Remove undefined fields
  Object.keys(dbUpdates).forEach(key => dbUpdates[key] === undefined && delete dbUpdates[key]);

  const { data, error } = await supabase
    .from('transactions')
    .update(dbUpdates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return toTransactionApi(data);
}

async function deleteTransaction(id) {
  if (!id) return false;

  if (!isSupabaseEnabled) {
    const index = store.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;
    store.transactions.splice(index, 1);
    return true;
  }

  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
  return true;
}

module.exports = {
  listTransactions,
  listAllTransactions,
  getTransactionById,
  saveTransaction,
  updateTransaction,
  deleteTransaction
};

