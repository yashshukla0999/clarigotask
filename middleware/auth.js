
const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'gwcwgcgwcgwvcgw789');
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
