require("dotenv").config();
const express = require("express") ;
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

let {requireAuth , findUser} = require('./middleware/auth');


let PORT = process.env.PORT || 2000;

let app = express();

// ! the URI to connect to DB
const dbUri  = process.env.MONGODBURI;



mongoose.connect(dbUri).then(()=>{
    console.log('the database Connected successfully')
}).catch((err)=>{
    console.log(err)
})


const morgan  = require('morgan')

app.use(expresslayouts);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static("public"))


app.set('view engine',"ejs");
app.set("layout",'layouts/notLogedInLayout');





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

app.use("/",requireAuth) ;
app.use('*',findUser);

app.use("/",homeRouter) 
app.use("/home",homeRouter) 
app.use("/about",aboutRouter) 
app.use("/contact",contactRouter) 
app.use("/api",apiRouter) 
app.use("/logIn",logInRouter) 
app.use("/signUp",signUpRouter) 
app.use("/logOut",(req,res)=>{
    res.cookie('jwt',"",{maxAge:1})
    res.redirect("/")
}) 


app.use((req,res)=>{
    res.send('404 error')
})




app.listen(PORT,()=>{
    console.log("connected in the port 2000")
})



// ! Jake.js