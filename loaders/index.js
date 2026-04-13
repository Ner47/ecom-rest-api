const expressLoader = require("./express");
const passportLoader = require("./passport");
const routerLoader = require("../routes");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
  const expressApp = await expressLoader(app);

  const passport = await passportLoader(expressApp);

  await routerLoader(app, passport);

  await swaggerLoader(app);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
