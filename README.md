# Habiter - A Modern Habit Tracker

Habiter is designed to make habit creation and maintenance simpler by giving you daily record tracking, streak calculation, and progress visualization. Whether you’re trying to form new habits or break old ones, Habiter helps you stay on top of your goals.

## Features

	•	User Registration & Login using JWT or Google OAuth.
	•	Create, Read, Update, Delete (CRUD) for Habits with automatic timestamping.
	•	Habit Records: Log daily progress, update statuses (success, failure, etc.), and view aggregated data.
	•	Streak Calculation: Dynamically calculates current and longest streak for each habit.
	•	Role-based / Owner-based Access Control: Ensures only the habit owner can edit or delete.

## Project Structure

```
habiter/
├─ backend/            # Node.js + Express, PostgreSQL, JWT, OAuth
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ routes/
│  ├─ services/
│  ├─ utils/
│  └─ server.js
├─ frontend/           # React app (JavaScript)
│  ├─ src/
│  ├─ public/
│  └─ vite.config.js
└─ README.md
```

### Backend Setup

1. Navigate to the backend directory:
    
    ```bash
    cd backend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Configure environment variables in .env.

4. (Optional) If you use Sequelize migrations:
    
    ```bash
    npx sequelize db:migrate
    ```
    
5. Start the server:
    
    ```bash
    npm start
    ```
    
    The backend will run on `http://localhost:4000` by default (or on the port you set in `.env`).

### Frontend Setup

1. Open a **new terminal** tab in the **`frontend`** directory:
    
    ```bash
    cd ../frontend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the development server:
    
    ```bash
    npm run dev
    ```
    
    The frontend typically runs on `http://localhost:5173`.

You can now access the Habiter frontend in your browser. The frontend will communicate with the backend API for data and authentication.

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
 1. JWT-Based Auth

    - `Register`: POST /api/users/register
      - `Body`: { "name": "John", "email": "john@example.com", "password": "secret123" }
      - `Returns`: A JSON response with a JWT token.
    - `Login`: POST /api/users/login
      - `Body`: { "email": "john@example.com", "password": "secret123" }
      - `Returns`: A JSON response with a JWT token.

 2. Google OAuth (via Passport)

  - `Initiate`: GET /api/users/google
    - Redirects to Google for sign-in.
  - `Callback`: GET /api/users/google/callback
    - Exchanges user info, issues a JWT, and redirects to your frontend with JWT token.

Access to habit endpoints is protected by JWT tokens and user ownership checks to ensure only the habit owner can modify or delete their habit. In code, auth.js verifies the token, and `authorization.js` checks ownership.

## API Endpoints
Below is a reference for your main endpoints. All authenticated requests require an Authorization: Bearer <JWT_TOKEN> header.

### User Routes

|Endpoint|Method|Description|
|---|---|---|
|`/api/users/register`|POST|Register a new user|
|`/api/users/login`|POST|Login to retrieve JWT token|
|`/api/users/google`|GET|Google OAuth initiation|
|`/api/users/google/callback`|GET|OAuth callback, issues JWT|


### Habit Routes

| Endpoint                               | Method | Description                               |
| -------------------------------------- | ------ | ----------------------------------------- |
| `/api/habits`                          | GET    | Get all habits for the authenticated user |
| `/api/habits/:id`                      | GET    | Get details for a specific habit          |
| `/api/habits`                          | POST   | Create a new habit                        |
| `/api/habits/:id`                      | PUT    | Update a habit’s name or dates            |
| `/api/habits/:id`                      | DELETE | Delete a habit if owned by the user       |
| `/api/habits/:habit_id/progress`       | POST   | Add a new record (date, status)           |
| `/api/habits/:habit_id/progress`       | GET    | Get all records for a habit               |
| `/api/habits/:habit_id/progress/:date` | PUT    | Update a record on a specific date        |
| `/api/habits/:habit_id/progress/:date` | DELETE | Delete a record for a specific date       |

### This documentation will be updated as the project progresses.
---