//atharva bhavsar// importtng libs
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

//connecting mongodb
mongoose
  .connect('mongodb://localhost:27017/atharvaWike', { useNewUrlParser: true })
  .then(() => {
    console.log('connected database successfully');
  });

//collection schema for mongo
const articleSchema = {
  title: String,
  content: String,
};

//creating model for mongodb
const Article = mongoose.model('Article', articleSchema);


//routing chain
app.route("/articles")


.get( async function (req, res) {
  const data = await Article.find({});
  res.send(data);
  console.log(data);
  //   Article.find({}, function (err, foundArticles) {
  //     if (!err) {
  //         res.send(req.foundArticles);
  //       console.log(foundArticles);
  //     } else {
  //       console.log(err);
  //     }
  //   });
})



//post req
.post(function (req, res) {
  // console.log(req.body.title);
  // console.log(req.body.content);
  const newObject = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newObject.save((err) => {
    if (!err) {
      res.send('successfull');
    } else {
      res.send(err);
    }
  });
})


//delete all articles
.delete(function(req,res){
    Article.deleteMany({},function(err){
        if(!err){
            res.send("All the articles are deleted");

        }else{
            res.send(err);
        }
    })
});

app.route("/articles/:articleTitle")

.get(function(req,res){
     Article.findOne({title:req.params.articleTitle},function(err,foundArticles){
        if(err){
            console.log(err)
        }else{
            res.send(foundArticles); 
        }
     })
})


.put(function(req, res){

    const articleTitle = req.params.articleTitle;
  
    Article.updateOne(
      {title: articleTitle},
      {content: req.body.newContent},
      {overwrite: true},
      function(err){
        if (!err){
          res.send("Successfully updated the content of the selected article.");
        } else {
          res.send(err);
        }
      });
  })

  
.patch(function(req, res){

    const articleTitle = req.params.articleTitle;
  
    Article.updateOne(
      {title: articleTitle},
      {content: req.body.newContent},
      {overwrite: true},
      function(err){
        if (!err){
          res.send("Successfully updated the content of the selected article.");
        } else {
          res.send(err);
        }
      });
  })


  .delete(function(req, res){
    const articleTitle = req.params.articleTitle;
    Article.findOneAndDelete({title: articleTitle}, function(err){
      if (!err){
        res.send("Successfully deleted selected article.");
      } else {
        res.send(err);
      }
    });
  });
  

app.listen(3000, function () {
  console.log('server started at port 3000');
});
