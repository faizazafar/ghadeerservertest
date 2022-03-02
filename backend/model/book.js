const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title :{
      
        type: String,
        required: true

    },

    price : Number,
    author : String ,
    description : String,
    createdAt:{
        type: Date,
        default : Date.now
    }
  });

  const Book = mongoose.model('Book' , bookSchema)
  module.exports = Book


//   export modal 