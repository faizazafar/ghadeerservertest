const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
   token :{
       type: String,
       required: true
   },
   createdAt :{
       type: Date,
       default : Date.now
   },
   UpdatedAt :{
    type: Date,
    default : Date.now
}
  });

  const Token = mongoose.model('Token' , tokenSchema )
  module.exports = Token 


//   export modal 