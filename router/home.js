let express = require('express');
let router = express.Router();
const expresslayouts = require('express-ejs-layouts');



router.get("/",(req,res)=>{
    req.session.count += 1 ;
    let data =  { title : "Home" , style : "css/style.css", active : "home",isLoged:false } ;
    res.render("home" ,data);
})


module.exports = router ;