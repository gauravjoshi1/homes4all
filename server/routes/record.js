const express = require("express");
const app = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require('multer');
let path = require('path');

app.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("homes4all");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
app.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
app.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    person_name: req.body.person_name,
    person_position: req.body.person_position,
    person_level: req.body.person_level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


// This section will help you update a record by id.
app.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
     
      response.json(res);
    });
});

// This section will help you delete a record
app.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
 
    response.status(obj);
  });
});




app.route("/getTypes").get(function (req, res) {
  let db_connect = dbo.getDb("homes4all");
  db_connect
    .collection("PropertyTypes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

let dt="";
let imgname="";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '../client/public');
  },
  filename: function(req, file, cb) {    
    dt= Date.now();
    imgname=file.originalname;
   
    
      cb(null,  dt + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });




app.route("/addProperty").post(upload.single('photo'), async(req, res) => {
  

  let db_connect = dbo.getDb();
  var Property = db_connect.collection("Property")  
  

    const createdProperty = await Property.insertOne({
      type:req.body.type,
      bathrooms:req.body.bathrooms, 
      bedrooms: req.body.bedrooms, 
      area: req.body.area,pricePerSqft:req.body.pricePerSqft,
      description:req.body.description,
      location:req.body.location,
      image:dt + path.extname(imgname),
      active:true
      
    });
if(createdProperty){
res.status(201).json(createdProperty);

}
else
{
  res.status(400).json({errror:"Unable to add property"})

}

});


app.route("/editProperty").post(upload.single('photo'), async(req, response) => {
  

  let db_connect = dbo.getDb("homes4all");
  let myquery = { _id: ObjectId( req.body._id )};
  let newvalues = {
    $set: {
      bathrooms: req.body.bathrooms,
      bedrooms: req.body.bedrooms,
      location: req.body.location,
      pricePerSqft:req.body.pricePerSqft,
      description:req.body.description,
      area:req.body.area,
      image:dt + path.extname(imgname),
      active : true

    },
  };
  
  db_connect
    .collection("Property")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
  
      response.json(res);
    });



});

app.route("/login").post(async function (req, res) {
  try{
    let db_connect = dbo.getDb();
    var User = db_connect.collection("Users")
    const { loginusername, loginpassword} = req.body;  
    if (!(loginusername) || !(loginpassword )) {
      res.status(400).json({error:"All input is required"});
  
    }


    const user = await User.findOne({
      
      email: loginusername.toLowerCase(), // sanitize: convert email to lowercase
      
    });
    if(user)
   { const validPassword = await bcrypt.compare(loginpassword, user.password);
     if(validPassword)
     {
      const token = jwt.sign(
        { user_id: user._id, loginusername },
        'secret',
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
    
      // return new user
      res.status(201).json(user);
      
     }
     else
     res.status(403).json({error:"Invalid credentials"});
     
  
  
  }
  else{
    res.status(403).json({error:"Invalid credentials"});
  }
    
  
  
   }
   catch(err)
   {
    console.log(err);
  }
  
  
});

app.route("/register").post( async function (req, res) {
 try{
  let db_connect = dbo.getDb();
  var User = db_connect.collection("Users")
  const { registername, registeremail, registerpassword } = req.body;
  if (!(registeremail && registerpassword && registername )) {
    res.status(400).json({error:"All input is required"});

  }
  const oldUser =  await User.findOne({email: registeremail });

  if (oldUser) {
    return res.status(409).json({error:"User Already Exists. Please Login"});
  }

  encryptedPassword = await bcrypt.hash(registerpassword, 10);
  console.log(encryptedPassword);

  const createduser = await User.insertOne({
    name:registername, 
    email: registeremail.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    role:'User'
  });
  if(createduser)
  {
    const user = await User.findOne({
      
      email: registeremail.toLowerCase(), // sanitize: convert email to lowercase
      
    });

  const token = jwt.sign(
    { user_id: user._id, registeremail },
    'secret',
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;

  // return new user
  res.status(201).json(user);

  }
  else
  {
    res.status(400).json({errror:"Unable to add user"})

  }
  


 }
 catch(err)
 {
  console.log(err);
}


});

app.route("/search").post(async (req, response) => {
	
  // const city = req.body.city; console.log(city);
  // if(city)
  // var cityregex = '^' + city;

  // let db_connect = dbo.getDb("homes4all");
  //  const collection= db_connect
  //     .collection("Property");

  //     collection.find({
  //       location: {
  //           $regex: cityregex,
  //           $options: 'i'
  //       }
  //   }, function(err, results) {


  //       if (err) throw err;
  //       response.status(201).json(results);
  //       });


  let db_connect = dbo.getDb();
  var property = db_connect.collection("Property")
   const city = req.body.city?String(req.body.city):'.*';
   const type = req.body.filter?String(req.body.filter):'.*';
  const loc = await property.find(
    
    {location: {$regex:'^'+city, $options:'i'}, type:{$regex:'^'+type, $options:'i'}
    
  },
  
  
  
  
  ).toArray(function (err, result) {
    if (err) throw err;
    response.json(result);
  });

 




    });






  app.route("/properties").get(function (req, res) {
    let db_connect = dbo.getDb("homes4all");
    db_connect
      .collection("Property")
      .find({active:true})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });


  app.route("/getCart").post(async function (req, res) {
    let db_connect = dbo.getDb("homes4all");
    
    db_connect
      .collection("UserCart")
      .find({userid:req.body.id})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });


  app.route("/getCartProperties").post(async function (req, res) {
    let db_connect = dbo.getDb("homes4all");
   
    const cartVals= await db_connect
      .collection("UserCart")
      .findOne({userid:req.body.id},{propertyid:1, _id:0,userid:0})
      
     const vals=[]
     cartVals.propertyid.forEach(element => {
      vals.push( ObjectId(element));
      console.log("E "+element)
       
     }); 
     
   const propertyVals = await db_connect.collection("Property").find( { _id : { $in : vals } } ).toArray();
    
   
   console.log(propertyVals);
     return res.json(propertyVals);





  });




  app.route("/softDelete").post(async function (req, res) {
    let db_connect = dbo.getDb("homes4all");
    console.log("ID: "+req.body._id)
    const filter = { _id: ObjectId(req.body._id) };
    const updateDoc = {
      $set: {
        active: false
      },
    };
    const property= db_connect.collection("Property");
    const result = await property.updateOne(filter, updateDoc);
    res.json(result);

  });


  app.route("/addToCart").post(async function (req, res) {
    
  let db_connect = dbo.getDb();
  var Cart = db_connect.collection("UserCart")  
  

  const query = { userid: req.body.userid };
  const update = { $push: { propertyid:req.body.propertyid }};
  const options = { upsert: true };
  const addcart = await Cart.updateOne(query, update, options);
      
   
if(addcart){
res.status(201).json(addcart);

}
else
{
  res.status(400).json({errror:"Unable to add to cart"})

}
    

  });


  app.route("/removeFromCart").post(async function (req, res) {
    
    let db_connect = dbo.getDb();
    var Cart = db_connect.collection("UserCart")  
    
   const remove= Cart.update({ userid: req.body.userid },
       { $pull: { 'propertyid': req.body.propertyid }}
     );
        
  console.log(remove);

  res.json();
      
  
    });



  


  




module.exports = app;