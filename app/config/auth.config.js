// const expressJwt = require('express-jwt');
const secret = require('../constants/auth.constants').AUTH_SECRET_KEY;

const attach = (app) => {
    // app.use(expressJwt({
    //     secret: secret,
    //     credentialsRequired: false,
    //     getToken: (req) => {
    //         return req.headers.token;
    //     },
    // }).unless({ path: ['/sign-in'] }));
};

module.exports = attach;