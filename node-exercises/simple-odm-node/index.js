const { MongoClient } = require('mongodb');
const Collection = require('./collection');

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
            const methods = new Collection(this.collectionInstance);
            return methods;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // <TODO>
    async createCollection(collectionName, schema = {}) {
        if (Object.keys(schema).length > 0) {

        } else {

        }
    }
}

module.exports = ODM;
