const express = require("express");
const dotenv = require('dotenv');
var cors = require('cors');
const locationRoutes = require('./routes/locationRouters'); 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/locations', locationRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};

start();
