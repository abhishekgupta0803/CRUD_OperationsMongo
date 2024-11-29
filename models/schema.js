const mongoose = require('mongoose');

main().then(()=>{
    console.log("Server is Ok");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employees');
}

const emp = mongoose.Schema({
   name:{
      type:String,
      require:true,
   },
   email:{
      type:String,
      require:true,
   },
   phNo:{
    type:Number,
    min:10,
   },

});

const Data = mongoose.model("Data",emp);
module.exports = Data;

