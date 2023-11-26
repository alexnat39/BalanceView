import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()



export async function getUser(id) {
    const [rows] = await pool.query(`
  SELECT * 
  FROM users
  WHERE id = ?
  `, [id])
    return rows
}

export async function createUser(id, username, password, first_name, last_name) {
    const [rows] = await pool.query(`
  INSERT INTO users (id, username, password, first_name, last_name)
  VALUES (?, ?, ?, ?, ?)
  `, [id, username, password, first_name, last_name])
    return rows
}
