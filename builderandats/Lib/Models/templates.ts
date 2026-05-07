import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    type : String,
    name : String ,
    html : String ,
    css :  String ,
    layoutInfo : {
        maxProject : Number ,
        maxExperience : Number ,
    }
       
    
})

export  const Template = mongoose.models.Template ||  mongoose.model("Template" , templateSchema)