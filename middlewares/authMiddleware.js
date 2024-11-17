exports.checkRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.session.user || req.session.user.role !== requiredRole) {
        return res.status(403).send('Доступ запрещен');
      }
      next();
    };
  };
  