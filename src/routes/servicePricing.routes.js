const express = require('express');
const { store, createId } = require('../data/store');
const { getConfig, setConfig } = require('../data/repositories/config.repo');

const router = express.Router();
const CONFIG_KEY = 'pricing_config';

router.get('/config', async (req, res, next) => {
  try {
    const config = await getConfig(CONFIG_KEY, store.pricingConfig);
    res.json(config);
  } catch (err) {
    next(err);
  }
});

router.put('/config', async (req, res, next) => {
  try {
    const body = req.body || {};
    const current = await getConfig(CONFIG_KEY, store.pricingConfig);
    const nextConfig = {
      ...current,
      pricingRules: body.pricingRules || current.pricingRules,
      paymentChannels: body.paymentChannels || current.paymentChannels,
      serviceChannelMapping: body.serviceChannelMapping || current.serviceChannelMapping,
      masterData: body.masterData || current.masterData
    };

    const saved = await setConfig(CONFIG_KEY, nextConfig);
    res.json({ message: 'Pricing config updated', config: saved });
  } catch (err) {
    next(err);
  }
});

router.post('/rules', async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.serviceType || !payload.vehicleType || payload.price === undefined) {
      return res.status(400).json({ message: 'serviceType, vehicleType, and price are required' });
    }

    const current = await getConfig(CONFIG_KEY, store.pricingConfig);
    const rule = {
      id: createId('pr'),
      serviceType: payload.serviceType,
      vehicleType: payload.vehicleType,
      hourStart: payload.hourStart ?? 1,
      hourEnd: payload.hourEnd ?? 1,
      price: Number(payload.price),
      status: payload.status || 'active'
    };

    const nextConfig = {
      ...current,
      pricingRules: [...(current.pricingRules || []), rule]
    };

    await setConfig(CONFIG_KEY, nextConfig);
    res.status(201).json({ message: 'Pricing rule created', rule });
  } catch (err) {
    next(err);
  }
});

router.patch('/rules/:id', async (req, res, next) => {
  try {
    const payload = req.body;
    const current = await getConfig(CONFIG_KEY, store.pricingConfig);
    const index = (current.pricingRules || []).findIndex((item) => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Pricing rule not found' });
    }

    const updatedRule = {
      ...current.pricingRules[index],
      ...payload
    };

    // Ensure price is numeric
    if (payload.price !== undefined) updatedRule.price = Number(payload.price);

    const nextRules = [...current.pricingRules];
    nextRules[index] = updatedRule;

    const nextConfig = { ...current, pricingRules: nextRules };
    await setConfig(CONFIG_KEY, nextConfig);
    
    res.json({ message: 'Pricing rule updated', rule: updatedRule });
  } catch (err) {
    next(err);
  }
});

router.delete('/rules/:id', async (req, res, next) => {

  try {
    const current = await getConfig(CONFIG_KEY, store.pricingConfig);
    const index = (current.pricingRules || []).findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Pricing rule not found' });
    }

    const nextRules = [...current.pricingRules];
    const [rule] = nextRules.splice(index, 1);
    const nextConfig = { ...current, pricingRules: nextRules };
    await setConfig(CONFIG_KEY, nextConfig);
    res.json({ message: 'Pricing rule deleted', rule });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
