const { MongoClient } = require('mongodb');

class ODM {
    constructor(url, dbName, collection) {
        this.connectInstance = '';
        this.dbInstance = '';
        this.url = url;
        this.dbName = dbName;
        this.collection = collection;
    }

    async connect() {
        try {
            if (!this.url) {
                throw 'Db not connected. Provide the URL';
            }
            if (!this.dbName) {
                throw 'Db not connected. Provide the Database name';
            }
            this.connectInstance = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
            return this.connectInstance;
        } catch (message) {
            throw new Error(message);
        }
    }

    async db() {
        if (!this.connectInstance) {
            throw new Error('Db not connected');
        }

        this.dbInstance = this.connectInstance.db(this.dbName);
        return this.dbInstance;
    }

    async all() {
        if (!this.dbInstance) {
            throw new Error('Please provide collection');
        }
        const response = await this.dbInstance.collection(this.collection).find({}).toArray();
        return response;
    }

    async and(param) {
        if (!this.dbInstance) {
            throw new Error('Please provide collection');
        }
        if (!param) {
            throw new Error('Please provide parameters')
        }
        const response = await this.dbInstance.collection(this.collection).find({ $and: param }).toArray();
        return response;
    }

    async or(param) {
        if (!this.dbInstance) {
            throw new Error('Please provide collection');
        }
        if (!param) {
            throw new Error('Please provide parameters')
        }
        const response = await this.dbInstance.collection(this.collection).find({ $or: param }).toArray();
        return response;
    }

    async count(param) {
        if (!this.dbInstance) {
            throw new Error('Please provide collection');
        }
        if (!param) {
            throw new Error('Please provide parameters')
        }
        const response = await this.dbInstance.collection(this.collection).countDocuments(param);
        return response;
    }

    async findOne(param) {
        if (!this.dbInstance) {
            throw new Error('Please provide collection');
        }
        if (!param) {
            throw new Error('Please provide parameters')
        }
        const response = await this.dbInstance.collection(this.collection).findOne(param);
        return response;
    }
}

module.exports = ODM;
