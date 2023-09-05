import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

import session from "express-session";
import passport from "passport";
import passportFacebook from "passport-facebook";

const FacebookStrategy = passportFacebook.Strategy;

const FACEBOOK_APP_ID = "248231954304161";
const FACEBOOK_APP_SECRET = "9c13681793edf42b9c8b8ef560b0f1d2";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,

      callbackURL: `https://refactored-space-adventure-p6rj6r74xpqc9r7w-5050.app.github.dev/facebook/callback`,
      profileFields: ['id', 'displayName', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function(user,done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);

app.use(session({secret: '9c13681793edf42b9c8b8ef560b0f1d2', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//Add passport to Facebook routes
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook', {
  //Redirect to the main page upon successfully login
  successRedirect: 'https://refactored-space-adventure-p6rj6r74xpqc9r7w-3000.app.github.dev/recordlist',

  //Redirect to login page on authentication failure
  failureRedirect: 'https://refactored-space-adventure-p6rj6r74xpqc9r7w-3000.app.github.dev/'
}));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
