import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashed,
    })

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Registration failed' })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Login failed' })
  }
}
