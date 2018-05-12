const jwt = require('jsonwebtoken');

const initUtils = (app) => {
    return {
        generateToken(jwtObject) {
            return jwt.sign(jwtObject, app.get('superSecret'), {
                expiresIn: 202020202,
            });
        },
        getDistanceFromLatLong(lat1, lon1, lat2, lon2) {
            const p = 0.017453292519943295;
            const c = Math.cos;
            const a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;

            return 12742 * Math.asin(Math.sqrt(a));
        },
        isDateBetween(date, minDate, maxDate) {
            return date >= minDate && date < maxDate;
        }
    }
};

module.exports = initUtils;