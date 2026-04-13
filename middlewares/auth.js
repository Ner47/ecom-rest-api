function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
}

function ensureAuthorizedUser(req, res, next) {
  if (String(req.user.id) !== String(req.params.userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return next();
}

module.exports = {
  ensureAuthenticated,
  ensureAuthorizedUser,
};
