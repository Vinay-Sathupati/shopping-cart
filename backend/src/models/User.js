import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    token: {type: String, default:null}
})

export default mongoose.model("User", userSchema)