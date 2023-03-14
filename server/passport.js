const passport = require("passport");

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Global Variables
const FACEBOOK_APP_ID = '3726567494237129'
const FACEBOOK_SECRET = '1fa0b21f47cd25956c02ed96139f2019'
const GOOGLE_CLIENT_ID = "803779558454-i5f0skhoc2d7v67abpusvt8crvmsqu6h.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET  = "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"

// configure Facebook authentication strategy
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret:FACEBOOK_SECRET ,
    callbackURL: '/auth/facebook/ecofitcloud',
    profileFields: ['id', 'displayName', 'email'],
    },
    function(accessToken, refreshToken, profile, cb) {
    // find or create client based on Facebook profile data
    const client = require('./models/client')
    client.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
    });
    }
));

// Configure Google authentication strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    const client = require('./models/client')
    client.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
    });
    //done(null, profile)
}
));

passport.serializeUser((client, done)=>{
    done(null, client)
});

passport.deserializeUser((client, done)=>{
    done(null, client)
});