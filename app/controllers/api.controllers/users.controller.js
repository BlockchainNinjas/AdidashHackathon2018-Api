/* global Buffer */
// const jwt = require('jsonwebtoken');
const secret = require('../../constants/auth.constants').AUTH_SECRET_KEY;

const INVALID_SIGNATURE =
    'Provided signature does not match the provided address';

const NOT_LOGGED_IN =
    'You must be logged in in order to view this information';

const usersController = ({ users }) => {};

module.exports = usersController;