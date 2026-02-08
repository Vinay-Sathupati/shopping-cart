import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from './src/routes/userRoutes.js'
import itemRoutes from './src/routes/itemRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.error(err))

app.use("/api/users", userRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.listen(process.env.PORT || 5000, ()=> console.log(`Server Running on ${process.env.PORT || 5000}`))