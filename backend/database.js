import mysql from "mysql2"

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getPeople() {
    const [rows] = await pool.query("SELECT * FROM people");
    return rows;
}


export async function getPerson(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM people
    WHERE id = ?
    `, [id]);
    return rows[0];
}

export async function addPerson(name, age, gender) {
    const [result] = await pool.query(`
    INSERT INTO people (name, age, gender)
    VALUES (?, ?, ?)
    `, [name, age, gender])
    const id = result.insertId
    return getPerson(id)
}

export async function checkPerson(name, age, gender) {
    const [rows] = await pool.query(`
      SELECT * 
      FROM people
      WHERE name = ? AND age = ? AND gender = ?
    `, [name, age, gender]);
    return rows.length > 0 ? rows : null;
  }