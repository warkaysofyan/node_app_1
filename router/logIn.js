const express = require("express");
let router = express.Router()

router.get('/',(req,res)=>{
    let data =  { title : "Log in" , style : "css/style.css", active : "" } ;
    res.render("login",data);
})

module.exports = router