class Collection {
    constructor(collectionInstance) {
        this.collectionInstance = collectionInstance;
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

    async save(query, param) {
        try {
            const saveParam = {$set: param};
            const response = await this.collectionInstance.update(query, saveParam);
            if(response && response.result && response.result.nModified > 0) {
                return 'success';
            } else {
                return 'failed';
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = Collection;