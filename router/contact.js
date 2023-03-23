let express = require('express') ;
let router = express.Router();
const Blog = require('./../models/blog');

router.get("/",(req,res)=>{
    let data =   {title:"Contact Us " , style:"css/style.css",active:"contact",isLoged:false };
    
    if(req.logged){
        data.layout="layouts/loggedInLayout"
    }

    const blog = new Blog({
        title:"sofyan",
        snippet:"sofyan",
        body:"cory"
    })

    blog.save().then(()=>{
        res.render("contact" ,data);
        console.log("saved")
    }).catch((e)=>{
        console.log(e)
    })

})
router.get("/allBlogs",(req,res)=>{
    
    Blog.find({title:"sofyan"}).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err)
    })

})

module.exports = router ;