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

export async function saveRating(movieId, movieRating) {
  const query = 'INSERT INTO Ratings(movie, rating) VALUES (?, ?)';
  await connection.query(query, [movieId, movieRating]);
}

export async function getAllRatings(userId) {
  const query = `SELECT * FROM Ratings WHERE user = ?`;
  return [await connection.query(query, [userId])];
}

export async function getRatingAverages(movies) {
  const averages = [];
  for (let movie of movies) {
    const average = await getAverageForMovie(movie.id)
    if (average.average) {
      averages.push({movie: movie.id, average: average.average})
    }
  }
  return averages;
}

async function getAverageForMovie(movieId) {
  const query = 'SELECT AVG(rating) FROM Ratings WHERE movie = ?'
  return [await connection.query(query, [movieId])];
}
