const express = require('express');
const { store } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');
const { authorize } = require('../middlewares/auth.middleware');

const router = express.Router();
const CONFIG_KEY = 'system_settings';

router.use(authorize(['super_admin', 'staff'], 'settings'));

router.get('/', async (req, res, next) => {
  try {
    const settings = await getConfig(CONFIG_KEY, store.systemSettings);
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.get('/receipt', async (req, res, next) => {
  try {
    const settings = await getConfig(CONFIG_KEY, store.systemSettings);
    res.json(settings.receipt || {});
  } catch (err) {
    next(err);
  }
});

router.put('/receipt', async (req, res, next) => {
  try {
    const body = req.body || {};
    const current = await getConfig(CONFIG_KEY, store.systemSettings);
    
    // Deep merge for receipt sub-objects
    const newReceipt = {
      ...current.receipt,
      ...body,
      entryBill: {
        ...(current.receipt?.entryBill || {}),
        ...(body.entryBill || {})
      },
      paymentBill: {
        ...(current.receipt?.paymentBill || {}),
        ...(body.paymentBill || {})
      }
    };

    const nextSettings = {
      ...current,
      receipt: newReceipt,
      updatedAt: new Date().toISOString()
    };

    const saved = await setConfig(CONFIG_KEY, nextSettings);
    res.json({ message: 'Receipt settings updated', receipt: saved.receipt });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    const current = await getConfig(CONFIG_KEY, store.systemSettings);
    const nextSettings = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString()
    };

    const saved = await setConfig(CONFIG_KEY, nextSettings);
    res.json({ message: 'System settings updated', settings: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
