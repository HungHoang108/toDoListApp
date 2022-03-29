//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://hunghoang1:12345678!@cluster0.0mgjk.mongodb.net/todolistDB", {useNewUrlParser: true})
const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema)







app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    
      res.render("list", {listTitle: "Today's tasks", newListItems: foundItems});
    
  })  

 

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item ({
    name: itemName
  })
  item.save()
  res.redirect("/")

});

app.post("/delete", function(req, res) {
  const deleteItem = req.body.removen;
  Item.findByIdAndDelete(deleteItem, function(err){
    if(err){
      console.log(err)
    }else{
      console.log("success")
    }
  })
  res.redirect("/")
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
