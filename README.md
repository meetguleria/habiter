# Habiter - A Modern Habit Tracker

Habiter is a full stack application that allows users to track their habits over time. It's built using Node.js, Express for backend, PostgreSQL for the database, and React with TypeScript for the frontend.

## Project Structure

The project is divided into two main directories:

- `backend`: Contains the Node.js and Express server, and connects to a PostgreSQL database.
- `frontend`: Will contain the React and TypeScript application (to be implemented).

### Backend

The backend directory is structured as follows:

```
/backend
  /config
    db.js
  /routes
    /api
      auth.js
      users.js
      habits.js
  /models
    User.js
    Habit.js
    HabitRecord.js
  /middleware
    auth.js
  server.js
```

- `config`: Contains configuration files, such as the database connection setup (`db.js`).
- `routes`: Contains route handlers, organized by the part of the application they're related to (`auth.js`, `users.js`, `habits.js`).
- `models`: Will contain files that define the database models (`User.js`, `Habit.js`, `HabitRecord.js`).
- `middleware`: Will contain middleware functions used in routes (`auth.js`).
- `server.js`: The main entry point for the application.

## Database Schema

The PostgreSQL database for this application includes three tables: `users`, `habits`, and `habit_records`.

<img width="722" alt="Screenshot 2023-08-01 at 2 26 38 PM" src="https://github.com/meetg94/habiter/assets/86708110/8e363dc7-30a0-4b52-b0a9-9a063a736d32">

- `users`: Stores user information with the following columns:
  - `id`: a unique identifier for each user (primary key)
  - `name`: the user's name
  - `email`: the user's email (unique across all users)
  - `password`: the user's hashed password

- `habits`: Stores habit information with the following columns:
  - `id`: a unique identifier for each habit (primary key)
  - `name`: the name of the habit
  - `start_date`: the date when the user started tracking the habit
  - `end_date`: the date when the user plans to stop tracking the habit (optional)
  - `user_id`: a foreign key linking to the `id` in the `users` table

- `habit_records`: Stores habit record information with the following columns:
  - `id`: a unique identifier for each habit record (primary key)
  - `date`: the date of the habit record
  - `status`: a boolean indicating whether the user completed their habit on this date
  - `habit_id`: a foreign key linking to the `id` in the `habits` table

This documentation will be updated as the project progresses.

---
# habiter
# habiter
