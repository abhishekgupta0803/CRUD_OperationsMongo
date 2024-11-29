const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const alldetails = require("./models/schema");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("Server is Ok");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employees');
}

//index data
app.get("/users", async(req,res)=>{

    let data = await alldetails.find();
    res.render("users.ejs",{data});

});

// update route
app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/users", async(req,res)=>{
    let {name:name,email:email,phNo:phNo} = req.body;
    let data = await new alldetails({
        name:name,
        email:email,
        phNo:phNo,
    });
    data.save();
    res.redirect("/users");
});

//edit 
app.put("/users/:id", async(req,res)=>{
    let {id:id} = req.params;
    let newNo = req.body;
    let update = await alldetails.findByIdAndUpdate(id,newNo,);
    res.redirect("/users");
});

app.get("/users/:id/edit", async(req,res)=>{
    let {id:id} = req.params;
   let data = await alldetails.findById(id);
    res.render("edit.ejs",{data});
});


app.delete("/users/:id", async(req,res)=>{
    let {id} = req.params;
   await alldetails.findByIdAndDelete(id);
   res.redirect("/users");
});


app.listen(port,()=>{
    console.log("Äpp is listening on port");
})