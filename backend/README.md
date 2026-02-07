# Mini CRM Backend

Backend API for Mini CRM application built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt

### Leads Module
- Create, read, update, delete leads
- Pagination, search, and filtering
- **Soft delete** (deleted leads don't appear in queries)
- Status management (New, Contacted, Qualified, Lost, Won)
- Assignment to users

### Companies Module
- Create and manage companies
- View company details
- View associated leads for each company

### Tasks Module
- Create tasks linked to leads
- Assign tasks to users
- Update task status
- **Authorization**: Only assigned users can update task status

### Dashboard
- Aggregated statistics (Total Leads, Qualified Leads, Tasks Due Today, Completed Tasks)

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create a `.env` file in the backend root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Run MongoDB**
Make sure MongoDB is running on your system.

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `GET /api/auth/users` - Get all users (Protected)

### Leads
- `GET /api/leads` - Get all leads with pagination/search/filter (Protected)
- `GET /api/leads/:id` - Get single lead (Protected)
- `POST /api/leads` - Create lead (Protected)
- `PUT /api/leads/:id` - Update lead (Protected)
- `DELETE /api/leads/:id` - Soft delete lead (Protected)
- `GET /api/leads/stats/dashboard` - Get dashboard stats (Protected)

### Companies
- `GET /api/companies` - Get all companies (Protected)
- `GET /api/companies/:id` - Get company with associated leads (Protected)
- `POST /api/companies` - Create company (Protected)
- `PUT /api/companies/:id` - Update company (Protected)
- `DELETE /api/companies/:id` - Delete company (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `PATCH /api/tasks/:id/status` - Update task status (Protected - Only assigned user)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Authorization Logic

### Authentication Middleware
All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

The middleware:
1. Extracts the token from the Authorization header
2. Verifies the token using JWT_SECRET
3. Finds the user by the decoded ID
4. Attaches the user to the request object
5. Allows the request to proceed or returns 401 Unauthorized

### Task Status Update Authorization
Only the user assigned to a task can update its status:
1. Checks if the task exists
2. Compares task.assignedTo with req.user._id
3. Returns 403 Forbidden if user is not authorized
4. Allows update if user is the assigned user

### Soft Delete Implementation
Leads use soft delete to prevent permanent data loss:
1. When deleting, set `isDeleted: true` and `deletedAt: Date`
2. Query middleware automatically filters out soft-deleted leads
3. Soft-deleted leads don't appear in any GET queries

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   ├── Lead.js               # Lead schema with soft delete
│   │   ├── Company.js            # Company schema
│   │   └── Task.js               # Task schema
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── lead.controller.js    # Lead CRUD + dashboard stats
│   │   ├── company.controller.js # Company CRUD
│   │   └── task.controller.js    # Task CRUD + authorization
│   ├── routes/
│   │   ├── auth.routes.js        # Auth routes
│   │   ├── lead.routes.js        # Lead routes
│   │   ├── company.routes.js     # Company routes
│   │   └── task.routes.js        # Task routes
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT authentication
│   ├── utils/
│   │   └── jwt.js                # JWT token generation/verification
│   └── server.js                 # Express app setup
├── package.json
└── .env.example
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/mini-crm |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment | development |

## Database Models

### User
- name, email, password (hashed), role

### Lead
- name, email, phone, status, assignedTo, company, isDeleted, deletedAt

### Company
- name, industry, location, website, phone, description

### Task
- title, description, lead, assignedTo, dueDate, status, priority

## Notes

- All passwords are hashed using bcryptjs before saving
- JWT tokens expire based on JWT_EXPIRE environment variable
- Soft-deleted leads are excluded from all queries automatically
- Only assigned users can update task status (enforced at controller level)
- Dashboard stats use MongoDB aggregation for performance
