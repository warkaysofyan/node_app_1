let jwt = require("jsonwebtoken");
let User = require('./../models/users');

module.exports.requireAuth = (req,res,next)=>{
    let token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"dadasafa",(err,decoded)=>{
            if(err){
                req.logged = false ;
            }else{
                req.logged = true ;
                console.log(decoded);
            }
        });
    }else{
        req.logged = false ;
    }
    next()
}

module.exports.findUser=(req,res,next)=>{
    let token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"dadasafa", async (err,decoded)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
