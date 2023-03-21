const express = require("express");
let router =  express.Router();
let User = require('./../models/users');
let bcrypt = require('bcrypt');



router.get('/',(rea,res)=>{
    let data = { title:"Sign Up" , style : "css/style.css", active : "" } ;
    res.render("signup",data)
})

router.post('/',(req,res,next)=>{

    bcrypt.hash(req.body.password,10).then((pass)=>{
        req.body.password = pass;
        next();
    }); 
})


router.post('/',(req,res)=>{
    console.log(req.body)
    let user = new User(req.body)
    
    user.save().then(()=>{
        console.log('user created');
        res.json({error:true,errors:"no Errors"});
    }).catch((err)=>{
        console.log(err);
        res.json({error:false,errors:err});
    })

})

module.exports = router ; 