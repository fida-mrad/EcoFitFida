const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
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