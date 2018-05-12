const { MongoClient, ObjectID } = require('mongodb');

const init = (dbConnectionString, dbName) => {
    return MongoClient
        .connect(dbConnectionString)
        .then((dbClient) => {
            const db = dbClient.db(dbName);
            db.getId = (id) => new ObjectID(id);
            return db;
        });
};

module.exports = init;
