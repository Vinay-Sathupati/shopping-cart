import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    brand: String,
    price: { type: Number, required: true},
    rating: Number,
    imageUrl: String
}, {timestamps: true})

export default mongoose.model("Item", itemSchema)