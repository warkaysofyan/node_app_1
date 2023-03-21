let express = require('express')
let router = express.Router();

router.get("/",(req,res)=>{
    let data =  {title:"About Us " , style:"css/style.css",active:"about",isLoged:false };
    res.render("about" ,data);
})

module.exports = router ;