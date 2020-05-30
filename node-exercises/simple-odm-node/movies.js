const ODM = require('./index');

const odm = new ODM('mongodb://localhost:27017', 'video', 'movieDetails');

const check = async () => {
    await odm.connect();
    await odm.db();
}

const getMoviesCount = async () => {
    await check();
    const collection = await odm.collection('movieDetails')

    const movieAll = await collection.all();
    //console.log(1, movieAll.length);

    const movieAnd = await collection.and([{ "imdb.rating": 9.2 }, { year: 2000 }]);
    //console.log(1, movieAnd);

    const movieOr = await collection.or([{ "imdb.rating": 9.2 }, { year: 2000 }]);
    //console.log(1, movieOr);

    const count = await collection.count({ "imdb.rating": 8 });
    //console.log(1, count);

    const findOne = await collection.findOne({ "imdb.rating": 8 });
    //console.log(1, findOne);
};

getMoviesCount();

