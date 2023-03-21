const mongoose = require('mongoose');
let Schema = mongoose.Schema;

require('dotenv').config();
async function Connect() {
    await mongoose.connect(process.env.MONGODBURI);
}


let usersSchema = new Schema({
    userName :{
        type:String,
        required:true,
        unique: [true,"the user name was used before"]
    },phoneNumber:{
        type:Number,
        reaquired:true,
        unique:true
    },email:{
        type:String,
        reaquired:true,
        unique:true
    },password:{
        type:String,
        reaquired:true,
        unique:true
    }
})




    usersSchema.path("userName").validate(async (userName)=>{
        Connect()
        let usersCount = await mongoose.models.user.countDocuments({userName})
        return !usersCount;
    },"username alredy registerd");
    
    usersSchema.path("email").validate(async(email)=>{
        Connect()
        let emailCont = await mongoose.models.user.countDocuments({email});
        return !emailCont;
    },"email alredy registerd");
    
    usersSchema.path("phoneNumber").validate(async(phoneNumber)=>{
        Connect()
        let phoneNumberCount = await mongoose.models.user.countDocuments({phoneNumber});
        return !phoneNumberCount;
    },"phone number alredy registers");




let User = mongoose.model("user",usersSchema); 

module.exports= User;