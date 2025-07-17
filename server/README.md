# NeatFleet Backend API

A robust REST API server built with Node.js, Express, TypeScript, and Prisma, featuring JWT authentication, rate limiting, and comprehensive security middleware.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Then fill in your environment variables (see [Environment Variables](#environment-variables))

3. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

4. **Set up database:**

   ```bash
   npx prisma db push
   ```

5. **Generate RSA key pair for JWT:**

   ```bash
   npm run generate-keys
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:YOUR_PORT/api`

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Security Features](#security-features)
- [Development Workflow](#development-workflow)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with RSA key pairs
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Deployment**: Vercel (serverless)

## 🏗 Project Architecture

```
src/
├── config/          # Configuration files
│   ├── corsOptions.ts    # CORS configuration
│   ├── limiter.ts        # Rate limiting setup
│   ├── logger.ts         # Winston logger config
│   ├── passport.ts       # Passport JWT strategy
│   └── prisma.ts         # Prisma client setup
├── controllers/     # Route controllers
│   ├── authController.ts # Authentication logic
│   └── usersController.ts # User management
├── lib/            # Utility functions
│   ├── generateKeyPair.ts # RSA key generation
│   └── issueJWT.ts       # JWT token creation
├── middleware/     # Express middleware
│   ├── authMiddleware.ts # JWT verification
│   ├── errorMiddleware.ts # Error handling
│   └── inputValidators.ts # Request validation
├── routes/         # API routes
│   ├── auth.ts          # Authentication routes
│   ├── users.ts         # User routes
│   └── index.ts         # Route aggregation
├── services/       # Business logic
│   └── userService.ts   # User service layer
├── types/          # TypeScript types
│   ├── error.ts         # Error types
│   └── index.ts         # Type exports
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method   | Endpoint    | Description         | Auth Required |
| -------- | ----------- | ------------------- | ------------- |
| `POST`   | `/register` | Register new user   | ❌            |
| `POST`   | `/login`    | Login user          | ❌            |
| `GET`    | `/profile`  | Get user profile    | ✅            |
| `PUT`    | `/profile`  | Update user profile | ✅            |
| `DELETE` | `/profile`  | Delete user account | ✅            |

### User Routes (`/api/users`)

| Method | Endpoint   | Description    | Auth Required |
| ------ | ---------- | -------------- | ------------- |
| `GET`  | `/`        | Get all users  | ❌            |
| `GET`  | `/search`  | Search users   | ❌            |
| `GET`  | `/:userId` | Get user by ID | ❌            |

### Request/Response Examples

#### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123"
}
```

#### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response:

```json
{
  "success": true,
  "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) with RSA key pairs for secure authentication:

- **Token Type**: Bearer token
- **Algorithm**: RS256 (RSA with SHA-256)
- **Key Storage**: RSA private/public key pair generated automatically
- **Middleware**: Passport.js with JWT strategy

### Using Authentication

Include the JWT token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🗃 Database Schema

### User Model

```prisma
model User {
  id         String   @id @default(uuid())
  first_name String   @db.VarChar(255)
  last_name  String   @db.VarChar(255)
  email      String   @unique @db.VarChar(255)
  phone      String   @unique @db.VarChar(255)
  password   String   @db.VarChar(255)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

### Schema Management

When making changes to the database schema:

1. **Update schema in `prisma/schema.prisma`**
2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
3. **Push changes to database:**
   ```bash
   npx prisma db push
   ```

## 🌍 Environment Variables

Create a `.env` file in the server directory:

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/neatfleet

# Server
PORT=8000
NODE_ENV=development

# JWT Keys (automatically generated)
# RSA_PRIVATE_KEY and RSA_PUBLIC_KEY will be generated automatically
```

### Required Variables:

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Environment (development/production)

## 📜 Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build the application for production     |
| `npm start`             | Start production server                  |
| `npm run generate-keys` | Generate RSA key pair for JWT            |
| `npm run vercel-build`  | Build script for Vercel deployment       |

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel serverless deployment:

1. **Build Configuration**: `vercel.json` handles the build process
2. **Environment Variables**: Set in Vercel dashboard
3. **Database**: Use hosted PostgreSQL (Supabase, PlanetScale, etc.)

### Deployment Steps:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## 🔒 Security Features

- **Helmet**: Sets security headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents abuse and DoS attacks
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with RSA keys
- **Error Handling**: Comprehensive error middleware

## 🔧 Development Workflow

### Adding New Routes

1. **Create controller** in `src/controllers/`
2. **Add route** in `src/routes/`
3. **Update route index** in `src/routes/index.ts`
4. **Add validation** in `src/middleware/inputValidators.ts`

### Database Changes

1. **Update schema** in `prisma/schema.prisma`
2. **Generate client**: `npx prisma generate`
3. **Push changes**: `npx prisma db push`

### Testing

```bash
# Run tests (when implemented)
npm test

# Check TypeScript compilation
npm run build
```

## 🤝 Contributing

1. Follow the [Git workflow](../README.md#-git-branching--workflow) in the main README
2. Use [Conventional Commits](../README.md#-committing-changes-conventional-commits)
3. Ensure all middleware and validation is properly implemented
4. Test API endpoints before submitting PRs

## 📝 Notes

- The server uses a custom Prisma client output directory (`../generated/prisma`)
- RSA keys are automatically generated and stored as environment variables
- CORS is configured to allow requests from `http://localhost:3000` (frontend)
- All routes are prefixed with `/api`
- Error handling is centralized through middleware

For more information about the overall project structure, see the [main README](../README.md).
