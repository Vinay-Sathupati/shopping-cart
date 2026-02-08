import express from 'express'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import auth from '../middleware/auth.js'

const router = express.Router()

//Place order
router.post("/", auth, async (req,res)=> {
    try {
    const cart = await Cart.findOne({userId: req.user._id})

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({message:"Cart is empty"})
    }

    const orderItems = cart.items
        .filter(item => item.itemId)
        .map(item => ({
            itemId:
            typeof item.itemId === "object" && item.itemId._id
                ? item.itemId._id
                : item.itemId,
            name: item.name
    }));

    if (orderItems.length === 0) {
        return res.status(400).json({ message: "Cart contains invalid items" });
    }

    const order = await Order.create({
        userId: req.user._id,
        items: orderItems
    })

    await Cart.deleteOne({userId: req.user._id})
    
    res.status(201).json({message: "order placed successfully", order})

    } catch (err) {
        console.error("ORDER ERROR:", err)
        res.status(500).json({message: 'Server error'})
    }
})

//Get orders
router.get("/", auth, async (req,res) => {
    try {
        const orders = await Order.find({userId: req.user._id}).sort({createdAt: -1}).populate("items.itemId")

        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
})


router.get("/all", async (req,res) => {
    try {
        const orders = await Order.find().sort({createdAt: -1}).populate("userId", "name email")

        res.status(200).json(orders)
    } catch (err) {
        console.error("FETCH ALL ORDERS ERROR:", err)
        res.status(500).json({message: "Server error"})
    }
})

export default router