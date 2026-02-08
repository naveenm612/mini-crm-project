import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

// ROUTES
import authRoutes from './routes/auth.routes.js'
import companyRoutes from './routes/company.routes.js'
import leadRoutes from './routes/lead.routes.js'
import taskRoutes from './routes/task.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// ✅ ROUTE REGISTRATION (THIS WAS MISSING)
app.use('/api/auth', authRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/dashboard', dashboardRoutes);
// test route
app.get('/', (req, res) => {
  res.send('API running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
