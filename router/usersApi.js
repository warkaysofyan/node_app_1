const express = require('express') ;
const router = express.Router();
let fs = require('fs');

let data = JSON.parse(fs.readFileSync('src/data/users.json',"utf-8"));

router.get("/users",(req,res)=>{
    res.json(data);
})

module.exports = router ; 