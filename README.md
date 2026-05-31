# Subscription Management Dashboard

A full-stack SaaS admin dashboard that allows users to subscribe to plans, view their active subscription.

> Built as part of the Gnxtace Technologies Full Stack Web Developer Technical Assessment.

---

## Live Demo

App Link = https://subscription-dashboard-task-zeta.vercel.app

- Backend = [Deployed on Render](https://subscription-dashboard-task-w0ab.onrender.com) - Use postman for testing
- Frontend = [Deployed on Vercel](https://subscription-dashboard-task-zeta.vercel.app)

---

## Admin Credentials
| Email | Password                   | 
| ------ | -------------------------- |
| `admin@gmail.com`   | admin@123       |

## Tech Stack

### Frontend

- **React.js** (Vite)
- **TailwindCSS**
- **Redux Toolkit** — global state management (auth + user data)
- **React Router** — client-side routing & protected routes

### Backend

- **Node.js + Express.js + TypeScript**
- **MongoDB** with **Mongoose** ORM
- **JWT** — access token authentication
- **Joi** — payload validation
- **node-cron** — scheduled jobs
- **bcryptjs** — password hashing

---

## Project Structure

```
subscription-dashboard-task/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── api/            # Axios API calls
│       ├── components/     # UI components
│       ├── features/       # Redux slices
│       ├── pages/          # Route pages
│       └── store.ts        # Redux store
│
└── server/                 # Node.js + Express backend
    └── src/
        ├── config/         # DB and environment config
        ├── controllers/    # Route handlers
        ├── cron/           # Scheduled tasks
        ├── middlewares/    # Auth & role-based middleware
        ├── models/         # Mongoose models
        ├── routes/         # API routes
        ├── seed/           # Database seed scripts
        └── utils/          # Utility helpers
```

---

## Setup & Run Instructions

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Guru07K/subscription-dashboard-task.git
cd subscription-dashboard-task
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

Seed the database with sample plans:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

## The backend will run at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint                   | Access | Description              |
| ------ | -------------------------- | ------ | ------------------------ |
| POST   | `/api/auth/register`       | Public | Register a new user      |
| POST   | `/api/auth/login`          | Public | Login and receive tokens |
| GET    | `/api/plans`               | Public | Get all available plans  |
| POST   | `/api/subscribe/:planId`   | User   | Subscribe to a plan      |
| GET    | `/api/my-subscription`     | User   | Get active subscription  |
| GET    | `/api/admin/subscriptions` | Admin  | Get all subscriptions    |

---

## Pages

| Route                  | Description                                |
| ---------------------- | ------------------------------------------ |
| `/login`               | User login page                            |
| `/register`            | User registration page                     |
| `/plans`               | Browse all subscription plans              |
| `/dashboard`           | User's current plan & subscription details |
| `/admin/subscriptions` | Admin view of all subscriptions            |

---

## Features

- JWT authentication with access
- Role-based access control (admin / user)
- Protected routes on both frontend and backend
- Database seeding with 3–4 realistic subscription plans
- Subscription status display (active / expired)
- Navigation bar with user menu and logout button
- Structured API error responses with proper HTTP status codes
- Input validation using Joi
- Light/Dark Theme

---

## Author

**Gnanaguru**  
📧 gnanaguru704@gmail.com
🔗 [GitHub](https://github.com/Guru07K/subscription-dashboard-task) | [LinkedIn](https://www.linkedin.com/in/gnanaguruk)
