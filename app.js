const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')
const mongoose = require('mongoose');

const homeStartingContent = "Head over to Compose menu that is inside the navbar. Give your post a beautiful title and then jot your beautiful blog";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1/blogPost', {useNewUrlParser: true});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.get("/", (req, res)=>{
  Blog.find({}, (err, blogs) => {
    res.render('home',{
      homeStartingContent:homeStartingContent,
      blogs:blogs
    });
  })
});
app.get("/about", (req, res)=>{
  res.render('about',{aboutContent:aboutContent});
});
app.get("/contact", (req, res)=>{
  res.render('contact',{contactContent:contactContent});
});
app.get("/compose", (req, res)=>{
  res.render('compose');
});
app.post("/compose", (req, res)=>{
  const newBlog = new Blog({
    title : req.body.postTitle,
    content : req.body.postBody
  });
  newBlog.save((err) => {
    if(!err){
      res.redirect('/');
    }
  });
});
app.get("/posts/:postId", (req, res)=>{
  Blog.findOne({_id: req.params.postId}, (err, post) => {
      res.render('post', {
        title : post.title,
        content : post.content
      });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("PORT 3000");
});