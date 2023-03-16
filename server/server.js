const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passportSetup = require("./passport");
const bodyParser = require('body-parser');
const passport = require('passport');
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


    // Initialise a session
    app.use(
        cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
    );

    // register regenerate & save after the cookieSession middleware initialization
    app.use(function(request, response, next) {
        if (request.session && !request.session.regenerate) {
            request.session.regenerate = (cb) => {
                cb()
            }
        }
        if (request.session && !request.session.save) {
            request.session.save = (cb) => {
                cb()
            }
        }
        next()
    })

    // Initialise the auth
    app.use(passport.initialize());
    app.use(passport.session());

    // Handeling CORS
    app.use(
        cors({
          origin: "http://localhost:3000",
          methods: "GET,POST,PUT,DELETE",
          credentials: true,
        })
      );

    // Connecting to the routes
    const clientRoutes = require('./routes/client.router');
    app.use('/client', clientRoutes);

    const authRoute = require('./routes/auth.router');
    app.use('/auth', authRoute)

    // Handling failed routes
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