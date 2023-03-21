require("dotenv").config();
const express = require("express") ;
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

let PORT = process.env.PORT || 2000;

let app = express();

// ! the URI to connect to DB
const cloudDbUri  = process.env.MONGODBURI;
const localDbUri = "mongodb://127.0.0.1:27017/appdb" ;



mongoose.connect(cloudDbUri).then(()=>{
    console.log('the database Connected successfully')
}).catch((err)=>{
    console.log(err)
})


const morgan  = require('morgan')

app.use(expresslayouts);
app.set('view engine',"ejs");
app.set("layout",'layouts/notLogedInLayout');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(morgan('dev'))
app.use(express.static("public"))

app.use("/css",express.static(__dirname + "public/css"));
app.use("/js",express.static(__dirname + "public/js"))


let sessinConfig = {
    secret : 'secret-key',
    resave: false ,
    saveUninitialized:false
}

app.use(session(sessinConfig))

// routers 


let homeRouter = require('./router/home');
let aboutRouter = require('./router/about');
let contactRouter = require('./router/contact');
let apiRouter = require('./router/usersApi');
let logInRouter = require('./router/logIn');
let signUpRouter = require('./router/signUp');


app.use("/",homeRouter) 
app.use("/home",homeRouter) 
app.use("/about",aboutRouter) 
app.use("/contact",contactRouter) 
app.use("/api",apiRouter) 
app.use("/logIn",logInRouter) 
app.use("/signUp",signUpRouter) 


app.use((req,res)=>{
    res.send('404 error')
})




app.listen(PORT,()=>{
    console.log("connected in the port 2000")
})



// ! Jake.js