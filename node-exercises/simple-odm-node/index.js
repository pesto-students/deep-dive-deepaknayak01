const { MongoClient } = require('mongodb');

class ODM {
    constructor(url, dbName) {
        this.connectInstance = '';
        this.dbInstance = '';
        this.url = url;
        this.dbName = dbName;
        this.collectionInstance = '';
    }

    async connect() {
        try {
            if (!this.url) {
                throw 'Db not connected. Provide the URL';
            } else if (!this.dbName) {
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

        try {
            this.dbInstance = await this.connectInstance.db(this.dbName);
            return this.dbInstance;
        } catch (error) {
            throw new Error('Error', error);
        }
    }

    async collection(collectionName) {
        try {
            this.collectionInstance = await this.dbInstance.collection(collectionName);
            const methods = {
                all: this.all.bind(this),
                and: this.and.bind(this),
                or: this.or.bind(this),
                count: this.count.bind(this),
                findOne: this.findOne.bind(this)
            }
            return methods;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async all() {
        try {
            const response = await this.collectionInstance.find({}).toArray();
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async and(param) {
        try {
            const response = await this.collectionInstance.find({ $and: param }).toArray();
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async or(param) {
        try {
            const response = await this.collectionInstance.find({ $or: param }).toArray();
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async count(param) {
        try {
            const response = await this.collectionInstance.countDocuments(param);
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findOne(param) {

        try {
            const response = await this.collectionInstance.findOne(param);
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = ODM;
