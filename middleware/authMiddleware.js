const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';
  if (!token) {
    //Appointments permission valid in appointmentsController.js
    if (req.url.includes('appointments')) {
      req.user = {
        id: 0,
        role: null
      }
      return next();
    } else {
      return res.status(401).json({ error: 'No token provided' });
    }
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    //Permission valid
    if (req.user.role != 'admin') {
      if (!req.url.includes('appointments') && !req.url.includes('auth')) {
        if (req.method != 'get') {
          return res.status(403).json({ error: 'Permission denied' });
        } else if (req.url.includes('customer')) {
          return res.status(403).json({ error: 'Permission denied' });
        }
      } else if (req.url.includes('auth')) {
        if (req.user.id != req.params.id) {
          return res.status(403).json({ error: 'Permission denied' });
        }
      }
    }

    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
