import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            itemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
            name:String
        }
    ]
}, {timestamps: true})

export default mongoose.model("Order", orderSchema)