import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()


//Create items
router.post("/", async (req,res)=> {
    try {
        const item = await Item.create(req.body)

        res.status(201).json(item)
    } catch (err) {
        res.status(400).json({message: "Failed to create item"})
    }
})

//Get all items
router.get("/", async (_,res)=> {
    const items = await Item.find()
    res.json(items)
})

export default router