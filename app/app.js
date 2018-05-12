const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const init = (data) => {
    app.use(cors());
    app.use(bodyParser.json());
    require('./config/auth.config')(app);


    const controllers = require('./controllers')(data);
    require('./routes')(app, controllers);

    return Promise.resolve(app);
};

module.exports = init;