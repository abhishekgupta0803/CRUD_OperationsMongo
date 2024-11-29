const empdata = require("./models/schema");
const mongoose = require('mongoose');

main().then(()=>{
    console.log("Server is Ok");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employees');
}


const details = [
    {
        name:"Abhishek",
        email:"guptaabhishek0803@gmail.com",
        phNo:9756153377,
    },
    {
        name:"Tushar",
        email:"tushar03@gmail.com",
        phNo:9756153377,
    },
    {
        name:"Palak",
        email:"palak0803@gmail.com",
        phNo:9756153377,
    },
];

empdata.insertMany(details);