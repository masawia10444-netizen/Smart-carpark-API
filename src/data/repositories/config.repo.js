const { supabase, isSupabaseEnabled } = require('../../db/supabase');
const { store } = require('../store');

function getMemoryConfig(key) {
  switch (key) {
    case 'pricing_config':
      return store.pricingConfig;
    case 'devices':
      return store.devices;
    case 'theme':
      return store.theme;
    case 'system_settings':
      return store.systemSettings;
    default:
      return undefined;
  }
}

function setMemoryConfig(key, value) {
  switch (key) {
    case 'pricing_config':
      store.pricingConfig = value;
      break;
    case 'devices':
      store.devices = value;
      break;
    case 'theme':
      store.theme = value;
      break;
    case 'system_settings':
      store.systemSettings = value;
      break;
    default:
      break;
  }
}

async function getConfig(key, fallbackValue) {
  if (!key) throw new Error('config key is required');

  if (!isSupabaseEnabled) return getMemoryConfig(key) ?? fallbackValue;

  const { data, error } = await supabase.from('app_config').select('data').eq('key', key).maybeSingle();
  if (error) throw error;
  return data?.data ?? fallbackValue;
}

async function setConfig(key, value) {
  if (!key) throw new Error('config key is required');

  if (!isSupabaseEnabled) {
    setMemoryConfig(key, value);
    return value;
  }

  const { data, error } = await supabase
    .from('app_config')
    .upsert({ key, data: value }, { onConflict: 'key' })
    .select('data')
    .single();

  if (error) throw error;
  return data?.data ?? value;
}

module.exports = {
  getConfig,
  setConfig
};
