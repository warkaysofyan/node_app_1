const express = require("express");
let router =  express.Router();
let User = require('./../models/users');
const jwt = require('jsonwebtoken');

let maxAge = 3*24*60*60;

function createToken(id){
    return jwt.sign({id},"dadasafa",{expiresIn:maxAge})
}

router.get('/',(rea,res)=>{
    let data = { title:"Sign Up" , style : "css/style.css", active : "" } ;
    if(req.logged){
        data.layout="layouts/loggedInLayout"
    }
    res.render("signup",data)
})


router.post('/',(req,res)=>{
    let user = new User(req.body)
    
    user.save().then((created)=>{
        console.log('user created');
        let token = createToken(created._id);
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});
        res.json({error:true,errors:"no Errors"});
    }).catch((err)=>{
        console.log(err);
        res.json({error:false,errors:err});
    })

})

module.exports = router ; 