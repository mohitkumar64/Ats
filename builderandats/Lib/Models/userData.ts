import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    } , 
    name : {
        type : String ,
    } ,
    email : {
        type : String ,
        required : true
    } , 
    phone : {
        type : String ,
    } 

})

export  const UserData = mongoose.models.UserData ||  mongoose.model("UserData" , userDataSchema)