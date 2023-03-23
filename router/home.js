let express = require('express');
let router = express.Router();
const expresslayouts = require('express-ejs-layouts');



router.get("/",(req,res)=>{
    
    let data =  { title : "Home" , style : "css/style.css", active : "home",isLoged:false } ;
    if(req.logged){
        data.layout="layouts/loggedInLayout"
    }
    res.render("home" ,data);
})


module.exports = router ;