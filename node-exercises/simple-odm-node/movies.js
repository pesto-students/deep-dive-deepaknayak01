const ODM = require('./index');

const odm = new ODM();
let db;

const check = async () => {
    await odm.connect('mongodb://localhost:27017');
    db = await odm.db('video');
    //console.log(db);
    return db;
}

const getMoviesCount = async () => {
    await check();
    const movie = await odm.all();
    console.log(1, movie);
};

getMoviesCount();

