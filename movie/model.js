import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sml12345',
  database: 'movie-db',
});

await connection.connect();

export async function getAll(userId) {
  const query = 'SELECT * FROM Movies WHERE user = ? OR public = 1';
  const [data] = await connection.query(query, [userId]);
  return data;
}

async function insert(movie, userId) {
  const query = 'INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)';
  const [result] = await connection.query(query, [
    movie.title,
    movie.year,
    movie.public,
    userId,
  ]);  return { ...movie, id: result.insertId };
}

async function update(movie, userId) {
  const query = 'UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';
  await connection.query(query, [
    movie.title,
    movie.year,
    movie.public,
    userId,
    movie.id,
  ]);
  return movie;
}


export async function get(id, userId) {
  const query = 'SELECT * FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  console.log(userId);
  const [data] = await connection.query(query, [id, userId]);
  return data.pop();
}

export async function remove(id, userId) {
  const query = 'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
  await connection.query(query, [id, userId]);
  return;
}

export function save(movie, userId) {
  if (movie.id) {
    return update(movie, userId);
  }
  return insert(movie, userId);
}

export async function saveRating(rating) {
  if (ratingForMovieExists(rating.user, rating.movie)) {
    await removeRating(rating.user, rating.movie);
  }
  const query = 'INSERT INTO Ratings(movie, rating, user) VALUES (?, ?, ?)';
  await connection.query(query, [rating.movie, rating.rating, rating.user]);
}

export async function getAllRatings(userId) {
  const query = `SELECT * FROM Ratings WHERE user = ?`;
  const [data] =  await connection.query(query, [userId]);
  return data;
}

async function ratingForMovieExists(userId, movieId) {
  const query = `SELECT * FROM Ratings WHERE user = ? and movie = ?`;
  const [data] = await connection.query(query, [userId, movieId]);
  return data.length > 0;
}

async function removeRating(userId, movieId) {
  const query = `DELETE FROM Ratings WHERE user = ? and movie = ?`;
  await connection.query(query, [userId, movieId])
  return;
}

export async function getRatingAverages(movies) {
  const averages = [];
  for (let movie of movies) {
    const average = (await getAverageForMovie(movie.id))[0]
    if (average.average) {
      averages.push({movie: movie.id, average: average.average})
    }
  }
  return averages;
}

async function getAverageForMovie(movieId) {
  const query = 'SELECT TRUNCATE(AVG(rating), 0) AS average FROM Ratings WHERE movie = ?'
  const [data] = await connection.query(query, [movieId]);
  return data;
}
