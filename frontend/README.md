# Mini CRM Frontend

React-based frontend application for Mini CRM with Material-UI components.

## Tech Stack

- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Material-UI (MUI)** - Component library
- **Vite** - Build tool

## Features

### Authentication
- Login and Registration pages
- JWT token-based authentication
- Protected routes
- Auto-redirect on unauthorized access

### Dashboard
- Real-time statistics display
- Total Leads, Qualified Leads
- Tasks Due Today, Completed Tasks

### Leads Management
- List view with pagination
- Search and filter functionality
- Create, edit, delete operations
- Status management (New, Contacted, Qualified, Lost, Won)
- Assign leads to users and companies
- **Soft delete** - deleted leads don't appear in list

### Companies Management
- List all companies
- Create new companies
- View company details
- See associated leads for each company

### Tasks Management
- List all tasks
- Create tasks linked to leads
- Assign tasks to users
- Update task status
- **Authorization**: Only assigned users can mark tasks as completed

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create a `.env` file in the frontend root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Start the development server**
```bash
npm run dev
```

The application will run on `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── api/                    # API service layer
│   │   ├── axios.js           # Axios configuration with interceptors
│   │   ├── auth.api.js        # Authentication API calls
│   │   ├── leads.api.js       # Leads API calls
│   │   ├── companies.api.js   # Companies API calls
│   │   └── tasks.api.js       # Tasks API calls
│   ├── components/            # Reusable components
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Topbar.jsx         # Top navigation bar
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── pages/                 # Page components
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── Dashboard.jsx      # Dashboard with stats
│   │   ├── Leads/             # Leads module
│   │   │   ├── LeadsList.jsx  # Leads list with pagination
│   │   │   └── LeadForm.jsx   # Add/Edit lead form
│   │   ├── Companies/         # Companies module
│   │   │   ├── CompaniesList.jsx
│   │   │   ├── CompanyForm.jsx
│   │   │   └── CompanyDetail.jsx
│   │   └── Tasks/             # Tasks module
│   │       ├── TasksList.jsx
│   │       └── TaskForm.jsx
│   ├── context/               # React Context
│   │   └── AuthContext.jsx    # Authentication state management
│   ├── routes/                # Routing configuration
│   │   └── AppRoutes.jsx      # All application routes
│   ├── App.jsx                # Main App component
│   └── main.jsx               # Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## Key Features

### Authentication Flow
1. User logs in with email and password
2. JWT token is received and stored in localStorage
3. Token is automatically attached to all API requests via Axios interceptor
4. On 401 response, user is redirected to login page

### Authorization
- **Task Status Update**: Only the user assigned to a task can update its status
- Frontend checks user ID against assigned user before allowing status update
- Backend enforces the same rule for security

### State Management
- **AuthContext** manages user authentication state globally
- User data persists in localStorage
- Context provides login, register, and logout functions

### Axios Interceptors
- **Request Interceptor**: Automatically attaches JWT token to all requests
- **Response Interceptor**: Handles 401 errors and redirects to login

### Pagination
- Leads list implements server-side pagination
- Shows current page, total pages, and total count
- Navigation controls for previous/next pages

### Search and Filter
- Search leads by name or email
- Filter leads by status
- Results update automatically

### Form Validation
- Required field validation
- Email format validation
- Password length validation (minimum 6 characters)
- Error messages displayed for invalid inputs

## UI/UX Features

### Material-UI Components
- Consistent design with MUI theme
- Responsive grid layout
- Professional forms and tables
- Icon buttons for actions
- Chips for status indicators
- Loading spinners during data fetching

### Sidebar Navigation
- Persistent sidebar on all pages
- Active route highlighting
- Clean icon-based navigation

### Top Bar
- User name display
- Logout button
- Fixed position

### Status Colors
- **New**: Blue (Info)
- **Contacted**: Orange (Warning)
- **Qualified**: Green (Success)
- **Lost**: Red (Error)
- **Won**: Green (Success)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Netlify Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variable: `VITE_API_URL` with your production API URL

### Important Notes

- Make sure to update `VITE_API_URL` to point to your production backend
- Enable CORS on your backend for the Netlify domain
- All routes should redirect to index.html (configure in netlify.toml)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

Main dependencies:
- react: ^18.2.0
- react-router-dom: ^6.20.1
- axios: ^1.6.2
- @mui/material: ^5.15.0
- @mui/icons-material: ^5.15.0

## License

ISC
