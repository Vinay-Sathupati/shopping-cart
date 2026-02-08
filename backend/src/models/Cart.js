import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    items: [{
        itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
        name: String,
    }]
}, {timestamps: true})


export default mongoose.model("Cart", cartSchema)