const Express = require("express");
const cors = require('cors')
const dbconnect  = require('./config/database')
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = new Express();
const Token = require('./model/tokens')
dbconnect();
const router = Express.Router();
app.use(cors())



const serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tokens = [];


app.use(bodyParser.json());
app.use("/", router);

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});

router.post("/register", async (req, res) => {

    
    try{
        const token = new Token ({
    
            token : req.body.token
        });
      
     newtoken = await token.save();
    
        // res.json({message:"data created", data: req.body})
    res.json({message:"data created", data: newtoken})
    } catch (error)
    {
        console.log(error)
    }

    console.log(newtoken.token)
    tokens.push(newtoken.token);
//   res.status(200).json({ message: "Successfully registered FCM Token!" });
//   console.log("token",req.body.token)

});

router.post("/notifications", async (req, res) => {
  const v =  await Token.find();
    console.log(v)
   
    array = v.map((item)=>{
    
      return item.token
  })
  console.log(array)

  try {
    const { title, body, imageUrl } = req.body;
    console.log( title)
    console.log( body)
  
  console.log("IN TRY",array)
      //  return
    await admin.messaging().sendMulticast(     
{
      tokens: array, 

        data: {
         
        },
       notification:{
         title: title,
         body : body
       }
    }
    );
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});