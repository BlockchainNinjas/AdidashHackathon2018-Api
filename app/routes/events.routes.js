const { Router } = require('express');
const passport = require('passport');

const attachRoutes = (app, { eventsController }) => {
    const router = new Router();

    router
        .put('/visit/:id', passport.authenticate('jwt'), eventsController.markEventAsVisited)
        .get('/', eventsController.getAll);

    app.use('/api/events', router);
};

module.exports = attachRoutes;