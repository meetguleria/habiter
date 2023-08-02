const db = require('../config/db');

async function createTables() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        )`
    );

    await db.query(`
        CREATE TABLE IF NOT EXISTS habits (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            start_date DATE,
            end_date DATE,
            user_id INTEGER REFERENCES users(id)
        )
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS habit_records (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            status BOOLEAN NOT NULL,
            habit_id INTEGER REFERENCES habits(id)
        )
    `);

    console.log('Tables created successfully');
}

createTables().catch(console.error)