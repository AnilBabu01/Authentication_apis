const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
     name:{
        type:String,
        require: true
  
      }, 
      email:{
         type:String,
         require: true,
         unique: true
    
        },
        phone:{
            type:String,
        },
        filePath:{
          type:String,
         },
        password:{
        type:String,
        require: true,
          } ,
        date:{
          type:Date,
          default: Date.now
    
        } 
}
 
);
const User = mongoose.model('user',UserSchema);

module.exports= User;

