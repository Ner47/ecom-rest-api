const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (username, passport, done) => {
      try {
        const user = await AuthServiceInstance.login({
          email: username,
          password,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  return passport;
};
