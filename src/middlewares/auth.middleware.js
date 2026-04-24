/**
 * Middleware to restrict access based on user roles and specific permissions
 * @param {Array<string>} allowedRoles - List of roles permitted to access the route
 * @param {string} [requiredPermission] - Specific permission required to access this route
 */
const authorize = (allowedRoles = [], requiredPermission = null) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    // 1. Check Role - Super Admins bypass permission checks (they have all access)
    const isSuperAdmin = req.user.role === 'super_admin';
    const isRoleAllowed = allowedRoles.length === 0 || allowedRoles.includes(req.user.role);

    if (!isRoleAllowed && !isSuperAdmin) {
      return res.status(403).json({ 
        message: 'Forbidden: Your role does not have permission to perform this action',
        requiredRoles: allowedRoles,
        yourRole: req.user.role
      });
    }

    // 2. Check Specific Permission (For non-super_admin users)
    if (requiredPermission && !isSuperAdmin) {
      const hasPermission = req.user.permissions && req.user.permissions.includes(requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({ 
          message: `Forbidden: You need '${requiredPermission}' permission to access this resource`,
          requiredPermission
        });
      }
    }

    next();
  };
};

module.exports = { authorize };
