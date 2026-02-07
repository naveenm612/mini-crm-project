# Mini CRM Application

A full-stack Customer Relationship Management (CRM) system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### Core Modules
- **Authentication** - JWT-based secure login and registration
- **Dashboard** - Real-time statistics and insights
- **Leads Management** - Complete CRUD with pagination, search, and filtering
- **Companies Management** - Manage companies and view associated leads
- **Tasks Management** - Create and assign tasks with authorization controls

### Key Highlights
- ✅ **Soft Delete** - Leads are soft-deleted and excluded from queries
- ✅ **Authorization** - Only assigned users can update task status
- ✅ **Pagination** - Efficient data loading with server-side pagination
- ✅ **Search & Filter** - Dynamic search and status filtering
- ✅ **Responsive UI** - Material-UI based professional interface
- ✅ **Protected Routes** - Secure access control

## 📁 Project Structure

```
mini-crm-project/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # Mongoose models
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Auth & validation
│   │   ├── utils/             # Helper functions
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # React + MUI
│   ├── src/
│   │   ├── api/               # API service layer
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (Auth)
│   │   ├── routes/            # Route configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Material-UI (MUI)** - Component library
- **Vite** - Build tool

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or Atlas connection)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Authorization Logic

### Authentication Flow
1. User registers or logs in with email and password
2. Backend validates credentials and generates JWT token
3. Token is sent to frontend and stored in localStorage
4. All subsequent API requests include token in Authorization header
5. Backend middleware verifies token before processing requests

### Task Status Update Authorization
**Rule**: Only the user assigned to a task can update its status

**Implementation**:
- Frontend checks if current user ID matches task's assignedTo ID
- Backend controller validates the same rule
- Returns 403 Forbidden if unauthorized

**Code Example (Backend)**:
```javascript
// Check if current user is assigned to the task
if (task.assignedTo.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: 'Not authorized to update this task status'
  });
}
```

### Soft Delete for Leads
**Rule**: Deleted leads should not appear in any queries

**Implementation**:
- Leads have `isDeleted` (boolean) and `deletedAt` (date) fields
- Delete operation sets these fields instead of removing document
- Mongoose query middleware automatically filters soft-deleted leads

**Code Example**:
```javascript
// Mongoose pre-find middleware
leadSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/users` - Get all users

### Leads
- `GET /api/leads` - Get leads (with pagination, search, filter)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Soft delete lead
- `GET /api/leads/stats/dashboard` - Get dashboard statistics

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company with leads
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status (authorized)
- `DELETE /api/tasks/:id` - Delete task

## 🎨 UI Wireframes Implementation

All UI wireframes from requirements are implemented:

1. ✅ **Login Page** - Clean form with validation
2. ✅ **Main Layout** - Persistent sidebar + top bar
3. ✅ **Dashboard** - 4 stat cards with real data
4. ✅ **Leads List** - Search, filter, pagination, actions
5. ✅ **Add/Edit Lead** - Complete form with dropdowns
6. ✅ **Companies List & Detail** - Table view and detailed view
7. ✅ **Tasks Page** - List with status update (authorized)

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Create account on deployment platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy backend service
5. Note the backend URL

### Frontend Deployment (Netlify/Vercel)

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify:
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=<your-backend-url>`

3. Configure redirects (create `netlify.toml` in frontend):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📝 Environment Variables

### Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

### 1. Register a User
- Go to `/register`
- Create an account

### 2. Login
- Use credentials to login
- You'll be redirected to dashboard

### 3. Create a Company
- Navigate to Companies
- Add a new company

### 4. Create a Lead
- Navigate to Leads
- Add a new lead
- Assign to user and company

### 5. Create a Task
- Navigate to Tasks
- Create a task for a lead
- Assign to yourself

### 6. Update Task Status
- Try updating task status (only works if assigned to you)
- Verify authorization works

### 7. Test Soft Delete
- Delete a lead
- Verify it doesn't appear in list
- Check database to see `isDeleted: true`

## 🔧 Development Scripts

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Production start
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin)
}
```

### Lead
```javascript
{
  name: String,
  email: String,
  phone: String,
  status: String (New/Contacted/Qualified/Lost/Won),
  assignedTo: ObjectId (User),
  company: ObjectId (Company),
  isDeleted: Boolean,
  deletedAt: Date
}
```

### Company
```javascript
{
  name: String,
  industry: String,
  location: String,
  website: String,
  phone: String,
  description: String
}
```

### Task
```javascript
{
  title: String,
  description: String,
  lead: ObjectId (Lead),
  assignedTo: ObjectId (User),
  dueDate: Date,
  status: String (Pending/In Progress/Completed),
  priority: String (Low/Medium/High)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

Created as a Mini CRM project demonstration

## 🙏 Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- Express.js community
- React community

---

**Live Demo**: [Add your deployed URL here]  
**GitHub Repository**: [Add your repo URL here]
