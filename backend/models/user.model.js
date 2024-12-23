import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username  : {
        type : String,
        required : [true, "Provide name"]
    },
    email : {
        type : String,
        required : [true, "Provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    role : {
        type : String,
        default : "user",
        enum: ["user","admin"]
    },
    favourite : [{
        type : mongoose.Types.ObjectId,
        ref : "books"
    }],
    cart : [{
        type : mongoose.Types.ObjectId,
        ref : "books"
    }],
    orders : [{
        type : mongoose.Types.ObjectId,
        ref : "order"
    }],
},{timestamps : true})

const UserModel = mongoose.model("User",userSchema)

export default UserModel