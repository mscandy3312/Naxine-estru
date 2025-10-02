const permit = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (allowed.includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
  };
};

module.exports = { permit };
