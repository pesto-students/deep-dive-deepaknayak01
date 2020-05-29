const { MongoClient } = require('mongodb');

class ODM {
    constructor(url, dbName) {
        this.connectInstance = '';
        this.check = '';
        this.url = url;
        this.dbName = dbName;
    }

    async connect() {
        try {
            if(!this.url) {
                throw 'Db not connected. Provide the URL';
            }
            if(!this.dbName) {
                throw 'Db not connected. Provide the Database name';
            }
            this.connectInstance = await MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
            return this.connectInstance;
        } catch(message) {
            throw new Error(message);
        }
    }

    async db() {
        if (!this.connectInstance) {
            throw new Error('Db not connected');
        }

        this.check = this.connectInstance.db(this.dbName);
        return this.check;
    }

    async all() {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        const response = this.check.collection('movieDetails').find({}).toArray();
        return response;
    }

    async and(param) {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        if(!param) {
            throw new Error('Please provide parameters')
        }
        const response = this.check.collection('movieDetails').find({$and: param}).toArray();
        return response;
    }

    async or(param) {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        if(!param) {
            throw new Error('Please provide parameters')
        }
        const response = this.check.collection('movieDetails').find({$or: param}).toArray();
        return response;
    }

    async count(param) {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        if(!param) {
            throw new Error('Please provide parameters')
        }
        const response = this.check.collection('movieDetails').countDocuments(param);
        return response;
    }

    async findOne(param) {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        if(!param) {
            throw new Error('Please provide parameters')
        }
        const response = this.check.collection('movieDetails').findOne(param);
        return response;
    }
}

module.exports = ODM;
