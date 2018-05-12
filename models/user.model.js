const ACCOUNT_ADDRESS_LENGTH = 42;

class User {
    static validateModel(userToValidate) {
        const areAllPropsPresent = typeof userToValidate !== 'undefined' &&
            typeof userToValidate.account === 'string' &&
            typeof userToValidate.nickname === 'string' &&
            typeof userToValidate.email === 'string';

        if (!areAllPropsPresent) {
            throw new Error('User must have address, nickname and email');
        }

        if (userToValidate.account.length !== ACCOUNT_ADDRESS_LENGTH) {
            throw new Error(
                `Account address must have length ${ACCOUNT_ADDRESS_LENGTH}`);
        }

        if (!userToValidate.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/g)) {
            throw new Error(
                `${userToValidate.email} is not a valid email!`
            );
        }

        return Promise.resolve(userToValidate);
    }
}

module.exports = User;