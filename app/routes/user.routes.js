const { Router } = require('express');

const attachRoutes = (app, { usersController, myshittiesController }) => {
    const router = new Router();

    app.use('/api/user', router);
};

module.exports = attachRoutes;