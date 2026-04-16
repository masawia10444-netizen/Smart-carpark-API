const express = require('express');
const { store } = require('../data/store');
const { findActiveUserByCredentials } = require('../data/repositories/users.repo');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findActiveUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = `mock-token-${user.id}-${Date.now()}`;
    const refreshToken = `mock-refresh-${user.id}-${Date.now()}`;

    store.sessions[token] = {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        status: user.status
      },
      refreshToken,
      createdAt: new Date().toISOString()
    };

    return res.json({
      token,
      refreshToken,
      user: store.sessions[token].user
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  const token = req.token;
  if (token && store.sessions[token]) {
    delete store.sessions[token];
  }
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', (req, res) => {
  res.json({ user: req.user });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  const entry = Object.entries(store.sessions).find(([, value]) => value.refreshToken === refreshToken);

  if (!entry) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const [, session] = entry;
  const newToken = `mock-token-${session.user.id}-${Date.now()}`;
  const newRefresh = `mock-refresh-${session.user.id}-${Date.now()}`;

  store.sessions[newToken] = { ...session, refreshToken: newRefresh };

  return res.json({
    token: newToken,
    refreshToken: newRefresh,
    user: session.user
  });
});

module.exports = router;
