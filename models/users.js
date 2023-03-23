require('dotenv').config();
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

// ! database connection function 

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
    }
})


usersSchema.pre('save',async function(next){
    let salt = await bcrypt.genSalt() ;
    this.password = await bcrypt.hash(this.password , salt) ;
    next() 
})

usersSchema.statics.login = async function(inp1,password){
    Connect()
    let user1 = await this.findOne({userName:inp1});
    let user2 = await this.findOne({email:inp1});
    if(user1||user2){
        let user = user1 || user2;
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return {
                sucsess:true,
                response:user
            };
        }else{return {
            sucsess:false,
            response:"ERR2"
        }}
    }else{return {
        sucsess:false,
        response:"ERR1"
    }}
}

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