import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sml12345',
  database: 'movie-db',
});

await connection.connect();

export async function get(query = {}) {
  const queryElements = [];
  if (query) {
    for (let key in query) {
      queryElements.push(`${key} = ?`);
    }
  }

  const queryString = `SELECT * FROM Users WHERE ${queryElements.join(
    ' AND '
  )}`;
  const [data] = await connection.query(queryString, Object.values(query));
  return data.pop();
}
