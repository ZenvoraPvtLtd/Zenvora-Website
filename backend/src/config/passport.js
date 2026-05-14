const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const User = require("../models/User.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ provider: "google", providerId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            user.provider = "google";
            user.providerId = profile.id;
            user.avatar = profile.photos?.[0]?.value;
            await user.save();
          } else {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              provider: "google",
              providerId: profile.id,
              avatar: profile.photos?.[0]?.value,
              role: "admin",
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/microsoft/callback`,
      scope: ["user.read"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ provider: "microsoft", providerId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value || profile._json?.mail || profile._json?.userPrincipalName;
          user = await User.findOne({ email });

          if (user) {
            user.provider = "microsoft";
            user.providerId = profile.id;
            await user.save();
          } else {
            user = await User.create({
              name: profile.displayName,
              email,
              provider: "microsoft",
              providerId: profile.id,
              role: "admin",
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
