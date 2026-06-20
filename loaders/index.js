const expressLoader = require("./express");
const passportLoader = require("./passport");
const routerLoader = require("../routes");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
  const expressApp = await expressLoader(app);

  const passport = await passportLoader(expressApp);

  await routerLoader(expressApp, passport);

  await swaggerLoader(expressApp);

  expressApp.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).send({ message });
  });
};
