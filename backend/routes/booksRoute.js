//all books route '
const express = require('express')
const books = require('../data.js')
const router  = express.Router();
const Book = require('../model/book.js')

router.get('/' ,   async (req , res)=>{

    try{
   const v =  await Book.find();
   console.log(v)
   res.json(v)
    }
    catch(error){
        console.log(error)

    }

    // res.send('all books list')
    // res.json(books).status(200)
})
router.post('/', async (req, res)=>{

    // console.log(req.body)

    //when mongo db is not connected
    // books.push(req.body)
    
    //when mongo is connected
    try{
    const book = new Book ({

        title: "book1",
        price: 400,
        author :"faiza",
        description: "the book"
    })
  
    //book create
    const newbook = await book.save();

    // res.json({message:"data created", data: req.body})
    res.json({message:"data created", data: newbook})
} catch (error)
{
    console.log(error)
}
    


});

router.delete('/:id', (req, res)=>{

    res.send(` delete`)

});
router.get('/:id' , (req , res)=>{

    const {id } = req.params
    console.log(id)
    try{

        const newbook = books.filter(item => item.id == id)
        res.json(newbook).status(200)

    }
    catch(e)
    {
          console.log(`server is running at ${e}`)
    }
    

})

module.exports = router 