const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server-config');
const { connect } = require('./config/database-config');
const logger = require('./config/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/home', (req, res) => {
    res.send('<h1>Home</h1>');
})

const setupAndStartServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server started at PORT ${PORT}`);
        await connect();
        console.log('Mongo db connected');
    });
}

setupAndStartServer();