const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },    
    email: {
        type: String,
        required: true,
        trim: true,
    },
    country:{
        type:String,
        required:true,
    
    },
    state:{
        type:String,
        required:true,
    
    }
    ,city:{
        type:String,
        required:true,
    
    },
    gender:{
        type:String,
        required:true,
    
    },
    dob:{
        type:Date,
        required:true,
        trim:true
    }
   
})

const Users=new mongoose.model("Users", userSchema);

module.exports= Users;