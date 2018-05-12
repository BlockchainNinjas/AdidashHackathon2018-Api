const Data = require('./abstraction');
const User = require('../models/user.model');

class UsersData extends Data {
    constructor(database) {
        super(database, 'users', User);
    }

    async findByAccountName(accountName) {
        if (typeof accountName !== 'string') {
            return Promise.reject('Passed account name must be a string!');
        }

        return this.collection.findOne({
            account: accountName,
        });
    }

    async getAllShititiesById(id) {
        const { result } = await super.findById(id);
        return result;
    }
}

module.exports = UsersData;
