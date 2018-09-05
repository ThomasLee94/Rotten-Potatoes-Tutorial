var express = require("express");
var app = express();

var exphbs =  require("express-handlebars");

app.get("/", function(req, res){
    res.render("home", {msg: "Hello World!"});
})

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(3000, ()=> {
    console.log("App listening on port 3000!")
})
