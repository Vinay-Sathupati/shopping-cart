import express from 'express'
import Cart from '../models/Cart.js'
import auth from '../middleware/auth.js'

const router = express.Router()

//Get cart
router.get("/", auth, async (req,res)=> {
    const cart = await Cart.findOne({userId: req.user._id}).populate("items.itemId")

    res.status(200).json(cart)
})


//Add items to cart
router.post("/", auth, async (req,res)=> {
    const {itemId, name} = req.body

    if (!itemId) {
        return res.status(400).json({message: "Item ID required."})
    }

    let cart = await Cart.findOne({userId: req.user._id})

    if (!cart) {
        cart = await Cart.create({
            userId: req.user._id,
            items: [{itemId, name}]
        })
    
        return res.status(201).json(cart)
    }

    const exists = cart.items.some(item => item.itemId.toString() === itemId)
    if (exists) {
        return res.status(409).json({message: 'Item already in cart'})
    }

    cart.items.push({itemId, name})
    await cart.save()

    res.json(cart)
})

//Remove items from cart
router.delete("/item/:itemId", auth, async (req,res) => {
    const {itemId} = req.params
    
    const cart = await Cart.findOne({userId:req.user._id})
    if (!cart) {
        return res.status(404).json({message: "Cart not found"})
    }

    cart.items = cart.items.filter(item => item.itemId.toString() !== itemId)

    await cart.save()
    res.json(cart)
})


//Clear cart
router.delete("/", auth, async (req,res)=> {
    await Cart.deleteOne({userId: req.user._id})
    res.json({message: "Cart cleared"})
})

export default router