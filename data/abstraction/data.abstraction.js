class Data {
    constructor(database, collectionName, validator) {
        if (typeof database === 'undefined') {
            throw new Error('Passed database is not defined!');
        }

        if (typeof collectionName !== 'string') {
            throw new Error('Passed collectionName must be a string');
        }

        if (typeof validator === 'undefined' ||
            typeof validator.validateModel !== 'function') {
            throw new Error('Validator must have validateModel function!');
        }

        this.database = database;
        this.collectionName = collectionName;
        this.validator = validator;

        this.collection = this.database.collection(this.collectionName);
    }

    async count() {
        return this.collection.count();
    }

    async getAll() {
        return this.collection.find().toArray();
    }

    async filter(filterObject) {
        if (typeof filterObject !== 'object') {
            throw new Error('Passed filter must be an object!');
        }

        return this.collection
            .find(filterObject)
            .toArray();
    }

    async findById(id) {
        if (typeof id !== 'string') {
            return Promise.reject('Id must be of type string');
        }

        return this.collection.findOne({ _id: this.database.getId(id) });
    }

    async deleteById(id) {
        if (typeof id !== 'string') {
            return Promise.reject('Id must be of type string');
        }
        return this.collection.remove({ _id: this.database.getId(id) });
    }

    async getShitsByPageNumber(pagenumber) {
        const result = await this.collection
            .find()
            .skip((pagenumber - 1) * 12)
            .limit(12)
            .toArray();
        return result;
    }

    async add(model) {
        return this.validator.validateModel(model)
            .then((resultModel) => {
                return this.collection.insert(resultModel);
            });
    }

    async update(modelToUpdate) {
        return this.validator.validateModel(modelToUpdate)
            .then((resultModel) => {
                return this.collection.update({
                    _id: modelToUpdate._id,
                }, modelToUpdate);
            });
    }
}

module.exports = Data;
