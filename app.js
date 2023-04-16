const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Post = require("./models/Post");
const methodOverride = require('method-override');
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://can1:T0JFWMlHch02eJbW@cluster0.elt9wsi.mongodb.net/?retryWrites=true&w=majority");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

app.set("view engine", "ejs");

app.get("/", postController.getPostsAll);
app.get("/posts/:id", postController.getPost);
app.get("/about", pageController.getAboutPage);
app.get("/add-post", pageController.getAddPage);
app.get("/posts/edit/:id", pageController.getEditPage);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.editPost);
app.delete("/posts/:id", postController.deletePost);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Uygulama çalıştırıldı");
})

