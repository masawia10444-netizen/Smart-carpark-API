const express = require('express');
const { store } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');

const router = express.Router();
const CONFIG_KEY = 'theme';

router.get('/', async (req, res, next) => {
  try {
    const theme = await getConfig(CONFIG_KEY, store.theme);
    res.json(theme);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const current = await getConfig(CONFIG_KEY, store.theme);
    const nextTheme = {
      ...current,
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    const saved = await setConfig(CONFIG_KEY, nextTheme);
    res.json({ message: 'Theme updated', theme: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
