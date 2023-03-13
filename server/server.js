const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const DB = require('./config/dbconnection')


const load = async () => {

    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan('dev'));

    await DB.open()
            .then(() => console.info(`MongoDB is connected`))
            .catch(() => console.error(`Unable to open database connection...`));

    // Handeling CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // configure Facebook authentication strategy
    passport.use(new FacebookStrategy({
      clientID: '3726567494237129',
      clientSecret: '1fa0b21f47cd25956c02ed96139f2019',
      callbackURL: 'http://localhost:8000/auth/facebook/ecofitcloud',
      //profileFields: ['id', 'displayName', 'email'],
    },
    function(accessToken, refreshToken, profile, cb) {
      // find or create client based on Facebook profile data
      const client = require('./models/client')
      client.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
    ));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/ecofitcloud',
        passport.authenticate('facebook', { failureRedirect: '/login-facebook' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
    });

    // initialize passport
    //app.use(passport.initialize());

    // Connecting to the routes
    const clientRoutes = require('./routes/client.router');
    app.use('/client', clientRoutes);

    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });

    return app;
}

const startServer = async (App = { load }) => {
    const port = process.env.PORT || 8000;
    const app = await App.load();
    const server = http.createServer(app);

    server.listen(port, () => console.info(`Server is connected to port ${port}`))
          .on( "error", () => console.error(`Server failed to start on port ${port}`));

}
    
startServer().catch((err) => {
    console.error({ message: err.message, stack: err.stack })
    process.exit(1)
});