const { store } = require('../data/store');

function authMiddleware(req, res, next) {
  if (
    req.path === '/' ||
    req.path.startsWith('/health') ||
    req.path.startsWith('/docs') ||
    req.path.startsWith('/api/v1/auth/login') ||
    req.path.startsWith('/api/v1/auth/refresh')
  ) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const session = store.sessions[token];

  if (!session) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = session.user;
  req.token = token;
  next();
}

module.exports = authMiddleware;
