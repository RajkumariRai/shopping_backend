const Joi = require("joi");
var express = require("express");

//initialized express  which initializes an express server and puts the initialized server into the variable app
var app = express();

const cors = require('cors');

//
app.use(express.json());
app.use(cors())

const emps = [
  { id: 1, email: "Puja Rai", password: "amitrai" },
  { id: 2, email: "Amit Rai", password: "amitrai" },
  { id: 3, email: "NAveen Rai", password: "amitrai" },
];

//create a simple GET request that returns a list of users
app.get("/login", (req, res) => {
  res.json(["Puja", "Amit", "Naveen", "Mansi"]);
});

app.get("/api/login", (req, res) => {
  
  res.send(emps);
});

app.get("/api/login:id", (req, res) => {
  const emp = emps.find((exist) => {
    console.log("i am here  ", exist);
    exist.id === parseInt(req.params.id);
  });

  if (!emp) res.status(404).send("This employee is not registered here.");
});

app.post("/api/login", (req, res) => {
  console.log("req.body.email ", req.body.email);

  if (req.body.email == undefined || req.body.email == "") {
    return res.send({ message: "you are fool , where is  you email id" });
  }
  console.log("req.body.password ", req.body.password);

  if (req.body.password == undefined || req.body.password == "") {
    return res.send({ message: "you are fool, where is your password  " });
  }

  for (let index = 0; index < emps.length; index++) {
    const element = emps[index];
    console.log("element ", element);
    if (
      element.email == req.body.email &&
      element.password == req.body.password
    ) {
      return res.send({
        message: "nice to see you again  ",
        userToken: "loginuser012345",
      });
    }
  }

  return res.send({ message: "Invalid user name " });

  // const schema = {
  //   name: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema)
  // console.log(result);

  // if(result.ValidationError) {
  //   //400 bad request
  //   res.status(400).send(result.ValidationError)
  //   return;
  //   }
  // if(!req.body.name || req.body.name.length< 3) {
  // res.status(400).send('Name is required and should be of min 3 charecters')
  // return;
  // }

  // const emp = {
  //   id: emps.length + 1,
  //   //there is a object with name property in the request body
  //   name: req.body.name,
  // };
  // //push object to the server and server create the new object
  // emps.push(emp),
  //   //return the new object in the body of response
  //   res.send(emp);
});

app.put("/api/adduser", (req, res) => {
  let temp = {
    id: emps.length,
    email: req.body.email,
    password: req.body.password,
  };
  emps.push(temp);
  res.send(emps);
});

//set our app to listen to port 4000 and create a callback function that says our server is running on port 3000
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}....`);
});
