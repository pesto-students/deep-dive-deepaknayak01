const { MongoClient } = require('mongodb');

class ODM {
    constructor() {
        this.connectInstance = '';
        this.check = '';
    }

    async connect(URL) {
        try {
            this.connectInstance = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
            return this.connectInstance;
        } catch {
            throw new Error('Db not connected');
        }
    }

    async db(dbName) {
        if (!this.connectInstance) {
            throw new Error('Db not connected');
        }

        this.check = this.connectInstance.db(dbName);
        return this.check;
    }

    async all() {
        if (!this.check) {
            throw new Error('Please provide collection');
        }
        const data = this.check.collection('movieDetails').find({}).toArray();
        return data;
    }
}

module.exports = ODM;
