const express = require("express");
let router = express.Router();
let User = require('./../models/users');

const jwt = require('jsonwebtoken');

let maxAge = 3*24*60*60;

function createToken(id){
    return jwt.sign({id},"dadasafa",{expiresIn:maxAge})
}


router.get('/',(req,res)=>{
    let data =  { title : "Log in" , style : "css/style.css", active : "" } ;
    if(req.logged){
        data.layout="layouts/loggedInLayout";
    }
    res.render("login",data);
});

router.post('/',async (req,res)=>{

        User.login(req.body.user,req.body.password).then((e)=>{

        let token = createToken(e.response._id);

        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});

        res.json({data:e});
        


    }).catch((err)=>{
        console.log(err);
        res.json({data:err});
    })
})

module.exports = router