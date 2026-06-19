const express = require("express");
const UserService = require("../services/UserService");
const {
  ensureAuthenticated,
  ensureAuthorizedUser,
} = require("../middlewares/auth");
const UserServiceInstance = new UserService();

module.exports = (passport) => {
  const router = express.Router();

  router.get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;

      const response = await UserServiceInstance.get({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/:userId",
    ensureAuthenticated,
    ensureAuthorizedUser,
    async (req, res, next) => {
      try {
        const { userId } = req.params;
        const data = req.body;
        console.log(req.user.id);
        const response = await UserServiceInstance.update({
          id: req.user.id,
          ...data,
        });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
};
