const database = require('./database');
let db;

const getData = async () => {
  db = await database.getDb();
  getMoviesCount(db);
  writersIntersection(db);
  actor(db);
  comparisonOperator(db);
  unratedByTomato(db);
  incrementalUpdate(db);
  fieldArraySize(db);
  regexSearch(db);
  movieRating(db);
}

getData()

/* Q1 (*)
  Return the number of movies in the "movies" collection without using array.length
*/
const getMoviesCount = async (db) => {
  const count = await db.collection('movies').countDocuments();
  //console.log(1, count);
  return count;
};

/* Q2 (*)
  Return the first movie with imdb rating = 9.2 and year = 2000.
  Also, use mongodb projections to only get title from mongodb as opposed
  to accessing title property from the object
*/
const movieRating = async () => {
  const firstMovie = await db.collection('movieDetails').find({ year: 2000, "imdb.rating": 9.2 }).project({ title: 1, _id: 0 }).toArray();
  console.log(firstMovie[0]);
  return firstMovie[0];
};

/* Q3 (*)
  Return the number of movies written by all these people (exactly these people in this order):
  Roberto Orci
  Alex Kurtzman
  Damon Lindelof
  Gene Roddenberry
*/
const writersIntersection = async (db) => {
  const moviesDetails = await db.collection('movieDetails').countDocuments({
    writers: ['Roberto Orci',
      'Alex Kurtzman',
      'Damon Lindelof',
      'Gene Roddenberry']
  });
  //console.log(3, moviesDetails);
  return moviesDetails;
};

/* Q4 (*)
  Return the number of movies written by any of the writers in Q3
*/
const writersUnion = async () => {
  const moviesAnyWriter = await db.collection('movieDetails').countDocuments({
    $or: [{
      writers: {
        $in: ['Roberto Orci',
          'Alex Kurtzman',
          'Damon Lindelof',
          'Gene Roddenberry']
      }
    }]
  });
  return moviesAnyWriter;
};

/* Q5 (*)
  Return the number of movies in which actor is "Jackie Chan"
*/
const actor = async (db) => {
  const numbeOfMoviesActed = await db.collection('movieDetails').find({
    actors: "Jackie Chan"
  }).toArray();
  //console.log(5, numbeOfMoviesActed.length);
  return numbeOfMoviesActed.length;
};

/* Q6 (*)
  Return the number of movies in which actor "Jackie Chan" is second
  in the array "actors"
*/
const positionalActor = async () => {
  const numbeOfMoviesActedSecond = await db.collection('movieDetails').find({
    "actors.1": "Jackie Chan"
  }).toArray();
  return numbeOfMoviesActedSecond.length;
};

/* Q7 (*)
  Return the first movie with imdb rating greater than or equal to 9.0
  and less than or equal to 9.2
*/
const comparisonOperator = async (db) => {
  const data = await db.collection('movieDetails').countDocuments({
    "imdb.rating":
      { '$gte': 9, '$lte': 9.2 }
  });
  //console.log(7, data);
  return data;
};

/* Q8 (*)
  Return the number of movies which have an actual rating opposed to
  being "UNRATED" or having no "rated" field at all
*/
const trimUnrated = async () => {
  const ratedMovies = await db.collection('movieDetails').countDocuments({
    $or: [{ 'rated': { $ne: 'UNRATED' } }, { 'rated': { $exists: false } }]
  });
  return ratedMovies;
};

/* Q9 (*)
  Return number of movies in which "tomato" field exists but "tomato.rating" does not
*/
const unratedByTomato = async (db) => {
  const unratedTomato = await db.collection('movieDetails').countDocuments({ $and: [{ 'tomato': { $exists: true } }, { 'tomato.rating': { $exists: false } }] });
  //console.log(9, unratedTomato);
  return unratedTomato;
};

/* Q10 (*)
  Return number of movies with higher imdb rating >= 9.0 OR
  metacritic >= 90
*/
const goodMovies = async () => {
  const higherImdbRated = await db.collection('movieDetails').countDocuments({
    $or: [{ 'rated': { $gte: 9 } }, { 'metacritic': { $gte: 90 } }]
  });
  return higherImdbRated;
};

/* Q11 (*)
  Return number of movies where tomato field exists AND
  is equal to null
*/
const regexSearch = async (db) => {
  const movie = await db.collection('movieDetails').find({ plot: { $regex: 'Master Yoda.*' } }).toArray();
  //console.log(11, { title: movie[0].title });
  return { title: movie[0].title };
};

/* Q12 (*)
  Return number of movies where 'Adventure' and 'Action'
  as genres in any order
*/
const arrayAll = async () => {
  const genresExists = await db.collection('movieDetails').find({
    genres: {
      $all: ['Adventure',
        'Action']
    }
  }).toArray();
  return genresExists.length;
};

/* Q13 (*)
  Return number of movies that were filmed in exactly 4 countries
*/
const fieldArraySize = async (db) => {
  const size = await db.collection('movieDetails').countDocuments({ 'countries': { $size: 4 } });
  //console.log(13, size);
  return size;
};

/* Q14 (*)
  Add a field called "myRating" = 90 to the movie "Iron Man 3" in movieDetails collection
*/
const addField = async () => {
  await db.collection('movieDetails').update({ title: "Iron Man 3" }, { $set: { myRating: 90 } });
};

/* Q15 (*)
  Increment the metacritic rating by 5 for the movie "Gone Girl" with a single query.
  Note: Do not use find() or findOne() to look for the current metacritic rating for "Gone Girl"
*/
const incrementalUpdate = async (db) => {
  await db.collection('movieDetails').updateOne({ title: "Gone Girl" }, { $inc: { metacritic: 5 } });
};

module.exports = {
  getMoviesCount,
  movieRating,
  writersIntersection,
  writersUnion,
  actor,
  positionalActor,
  comparisonOperator,
  trimUnrated,
  unratedByTomato,
  goodMovies,
  regexSearch,
  arrayAll,
  fieldArraySize,
  addField,
  incrementalUpdate
};