const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT } = require('./config/server-config');
const apiRoutes = require('./routes/index');
const { connect } = require('./config/database-config');
const logger = require('./config/logger');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.get('/home', (req, res) => {
    res.send('<h1>Home</h1>');
})

const setupAndStartServer = function() {
    app.listen(PORT, async function() {
        console.log(`Server started at PORT ${PORT}`);
        await connect();
        console.log('Mongo db connected');
    });
}

setupAndStartServer();