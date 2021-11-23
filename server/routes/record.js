const express = require("express");
const app = express.Router();

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
app.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
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


app.route("/addProperty").post(async function (req, res) {
  let db_connect = dbo.getDb();
  var Property = db_connect.collection("Property")  

    const createdProperty = await Property.insertOne({
      bathrooms:req.body.bathrooms, 
      bedrooms: req.body.bedrooms, 
      area: req.body.area,pricePerSqft:req.body.pricePerSqft,
      description:req.body.description,
      location:req.body.location
      
    });
if(createdProperty){
res.status(201).json(createdProperty);

}
else
{
  res.status(400).json({errror:"Unable to add user"})

}


});


app.route("/login").post(async function (req, res) {
  try{
    let db_connect = dbo.getDb();
    var User = db_connect.collection("Users")
    const { loginusername, loginpassword} = req.body;  
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

app.route("/search").post((req, response) => {
	
  console.log(req.body.city);



	});

  app.route("/properties").get(function (req, res) {

    let db_connect = dbo.getDb("homes4all");
    
    db_connect
    
    .collection("Property")
    
    .find({})
    
    .toArray(function (err, result) {
    
    if (err) throw err;
    
    res.json(result);
    
    });
    
    });
  




module.exports = app;