import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body
    try {
        const hashed = await bcrypt.hash(password, 10)

        await User.create({name, email, password: hashed})

        res.status(201).json({message: "Registeration Success"})
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({message:"email already exists"})
        }
        return res.status(500).json({message: 'Server error'})
    }
})


router.post("/login", async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) {
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const tokenNotPresent = user.token === null
    if (!tokenNotPresent) {
        return res.status(403).json({message: 'User is already logged in on another device.'})
    }

    const token = jwt.sign({id:user._id.toString()}, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXP})

    user.token = token
    await user.save()

    const isProd = process.env.NODE_ENV === 'production'
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({message: 'Login successful'})
})


router.post("/logout", auth, async (req,res)=> {
    req.user.token = null
    await req.user.save()

    const isProd = process.env.NODE_ENV === 'production'
    res.clearCookie('accessToken', {
        httpOnly:true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    })

    res.json({message: "Logged out successfully"})
})

//Get user details
router.get("/user", auth, async (req,res)=> {
    try {
        const userDetails = await User.findOne({_id: req.user._id}).select("-password,-token")

        res.json(userDetails)
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
})

//Get all users
router.get("/all", async (req,res) => {
    try {
        const users = await User.find().select("-password -token")

        res.json(users)
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
})

export default router