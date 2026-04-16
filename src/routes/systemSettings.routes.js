const express = require('express');
const { store } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');

const router = express.Router();
const CONFIG_KEY = 'system_settings';

router.get('/', async (req, res, next) => {
  try {
    const settings = await getConfig(CONFIG_KEY, store.systemSettings);
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    const current = await getConfig(CONFIG_KEY, store.systemSettings);
    const nextSettings = {
      general: {
        ...current.general,
        ...(body.general || {})
      },
      receipt: {
        ...current.receipt,
        ...(body.receipt || {})
      },
      billing: {
        ...current.billing,
        ...(body.billing || {})
      },
      updatedAt: new Date().toISOString()
    };

    const saved = await setConfig(CONFIG_KEY, nextSettings);
    res.json({ message: 'System settings updated', settings: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
