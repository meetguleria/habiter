# Habiter - A Modern Habit Tracker

Habiter is designed to make habit creation and maintenance simpler by giving you daily record tracking, streak calculation, and progress visualization. Whether you’re trying to form new habits or break old ones, Habiter helps you stay on top of your goals.

## Features

	•	User Registration & Login using JWT or Google OAuth.
	•	Create, Read, Update, Delete (CRUD) for Habits with automatic timestamping.
	•	Habit Records: Log daily progress, update statuses (success, failure, etc.), and view aggregated data.
	•	Streak Calculation: Dynamically calculates current and longest streak for each habit.
	•	Role-based / Owner-based Access Control: Ensures only the habit owner can edit or delete.

## Project Structure

The project is divided into two main directories:

- `backend`: Contains the Node.js and Express server, and connects to a PostgreSQL database.
- `frontend`: Will contain the React and JavaScript application.

## Database Schema

The PostgreSQL database for this application includes three tables: `users`, `habits`, and `habit_records`.

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
  - `user_id`: Foreign key referencing `users.id`

- `habit_records`: Stores habit record information with the following columns:
  - `id`: a unique identifier for each habit record (primary key)
  - `date`: the date of the habit record
  - `status`: Enum (default, success, failure)
  - `clickCount`: Integer tracking user interactions (default: 0)
  - `habit_id`: Foreign key referencing `habits.id`

## Authentication & Authorization
# 1. JWT-Based Auth

    - `Register`: POST /api/users/register
      - `Body`: { "name": "John", "email": "john@example.com", "password": "secret123" }
      - `Returns`: A JSON response with a JWT token.
    - `Login`: POST /api/users/login
      - `Body`: { "email": "john@example.com", "password": "secret123" }
      - `Returns`: A JSON response with a JWT token.

# 2. Google OAuth (via Passport)

  - `Initiate`: GET /api/users/google
    - Redirects to Google for sign-in.
  - `Callback`: GET /api/users/google/callback
    - Exchanges user info, issues a JWT, and redirects to your frontend with JWT token.

Access to habit endpoints is protected by JWT tokens and user ownership checks to ensure only the habit owner can modify or delete their habit. In code, auth.js verifies the token, and `authorization.js` checks ownership.

## API Endpoints
Below is a reference for your main endpoints. All authenticated requests require an Authorization: Bearer <JWT_TOKEN> header.

# User Routes
  - `POST /api/users/register`
    Create a new user.
  - `POST /api/users/login`
    Login to retrieve a JWT token.
  - `GET /api/users/google` and GET `/api/users/google/callback`
    For Google OAuth flows (Passport).

# Habit Routes
  - `GET /api/habits`
    Retrieve all habits for the logged-in user.
  - `GET /api/habits/:id`
    Retrieve details for a specific habit (including streak data).
  - `POST /api/habits`
    Create a new habit.
  - `PUT /api/habits/:id`
    Update a habit’s name or dates.
  - `DELETE /api/habits/:id`
    Delete a habit if owned by the user.

# Progress (Habit Records)
  - `POST /api/habits/:habit_id/progress`
    Add a new record (with date, status, etc.).
  - `GET /api/habits/:habit_id/progress`
    Get all records for a given habit.
  - `PUT /api/habits/:habit_id/progress/:date`
    Update a record for a specific date.
  - `DELETE /api/habits/:habit_id/progress/:date`
    Delete a record for a specific date.

This documentation will be updated as the project progresses.
---