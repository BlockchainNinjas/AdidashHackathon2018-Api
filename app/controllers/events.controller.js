const eventsController = ({ users }, utils) => {
    return {
        async markEventAsVisited(req, res) {
            console.log(req.user, 'logged user');
            const eventId = req.params.id;

            const { coordinates, time } = req.body;

            const targetEvent = require('../../json-data/matches.json').find(e => e.id === Number(eventId));
            if (!targetEvent) {
                return res.status(400).send({ success: false, message: 'Invalid event id!' });
            }

            const eventDate = new Date(targetEvent.date);
            const isBetween = utils.isDateBetween(
                new Date(time),
                new Date(eventDate.getTime() - 30 * 60 * 1000),
                new Date(eventDate.getTime() + 140 * 60 * 1000));
            if (!isBetween) {
                return res.status(400).send({ success: false, message: 'Cannot mark a past event as visited!' });
            }

            const distanceInKm = utils
                .getDistanceFromLatLong(coordinates.latitude, coordinates.longitude, targetEvent.stadium.latitude, targetEvent.stadium.longitude);

            if (distanceInKm > 2) {
                return res.status(400).send({ success: false, message: 'Location too far from event!' })
            }

            req.user.visitedEvents = req.user.visitedEvents ?
                req.user.visitedEvents.concat(targetEvent) : [targetEvent];

            await users.updateUserInfo(req.user);
            return res.status(204).send({ success: true, message: 'Event visited successfully', targetEvent });
        },
        async getAll(req, res) {
            return res.status(200).send({ success: true, events: require('../../json-data/matches.json') });
        }
    };
};

module.exports = eventsController;