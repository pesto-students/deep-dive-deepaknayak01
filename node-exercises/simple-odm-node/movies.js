const ODM = require('./index');

const odm = new ODM('mongodb://localhost:27017', 'video', 'movieDetails');

const check = async () => {
    await odm.connect();
    await odm.db();
}

const getMoviesCount = async () => {
    await check();

    const movieAll = await odm.all();
    //console.log(1, movieAll.length);

    const movieAnd = await odm.and([{ "imdb.rating": 9.2 }, { year: 2000 }]);
    //console.log(1, movieAnd);

    const movieOr = await odm.or([{ "imdb.rating": 9.2 }, { year: 2000 }]);
    //console.log(1, movieOr);

    const count = await odm.count({ "imdb.rating": 8 });
    //console.log(1, count);

    const findOne = await odm.findOne({ "imdb.rating": 8 });
    //console.log(1, findOne);
};

getMoviesCount();

