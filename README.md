# Referral System (MERN Assessment)

A full-stack referral system where users can register, log in, get a unique referral code, earn points when others sign up with their code, and view referrals on a dashboard.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |

## Features

- User registration and login
- Unique referral code for every user
- Optional referral code on signup (+10 points to referrer)
- Protected dashboard with:
  - Referral code (copy support)
  - Total points
  - List of referred users

## Project Structure

```
Referral System/
├── backend/                 # Express + Prisma API
│   ├── prisma/              # Schema & migrations
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── middlewares/
│   │   ├── modules/         # auth, dashboard
│   │   ├── routes/
│   │   └── utils/
│   └── .env.example
├── frontend/                # Next.js app
│   ├── src/
│   │   ├── app/             # Pages
│   │   ├── components/      # UI, auth, dashboard, layout
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── services/
│   └── .env.example
└── README.md
```

## Prerequisites

- Node.js 18+
- PostgreSQL running locally
- npm

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Referral System"
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials and a strong `JWT_SECRET`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/referral"
JWT_SECRET="your-strong-secret"
PORT=5000
```

Create the database (if it does not exist), then install and migrate:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs at: `http://localhost:5000`

Health check: `http://localhost:5000/api/v1/health`

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login user |
| GET | `/dashboard` | Bearer JWT | Dashboard data |

### Register body

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "referralCode": "OPTIONAL8"
}
```

### Login body

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

### Dashboard header

```
Authorization: Bearer <token>
```

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/register` | Sign up (supports `?ref=CODE`) |
| `/login` | Log in |
| `/dashboard` | Protected dashboard |

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for signing JWT |
| `PORT` | Yes | API port (default example: 5000) |
| `JWT_EXPIRES_IN` | No | Token expiry (default: `7d`) |
| `REFERRAL_REWARD_POINTS` | No | Points per referral (default: `10`) |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |

## Useful Scripts

### Backend

```bash
npm run dev              # Start API with nodemon
npm start                # Start API in production mode
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

### Frontend

```bash
npm run dev    # Start Next.js dev server
npm run build  # Production build
npm start      # Start production server
npm run lint   # Run ESLint
```

## Security Notes

- Never commit `.env` or `.env.local` files
- Use strong unique values for `JWT_SECRET` in production
- Passwords are hashed with bcrypt before storage

## License

This project was built as a MERN developer assessment.
