const mongoose = require('mongoose');
// const mongoURL ="mongodb://localhost:27017/NotesTake?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURL ="mongodb://localhost:27017/erp"

const connectoMongo =()=>{
   
    mongoose.connect(mongoURL,()=>{

        console.log("you connected mongodb successfully");
    })

}

module.exports=connectoMongo