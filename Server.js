const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usermodel = require("./models/User");

const app = express();
// cors is used to cross platform localhost
app.use(cors());
// the data comes to goes with json format
app.use(express.json());
const port = 5000;

mongoose.connect("mongodb://localhost:27017/user");

const database = mongoose.connection;

database.on("connected", () => console.log("database connected"));
database.on("error", (err) => console.log(err));

//  if u want to create a new user justy pass req.body
app.post("/createUser", (req, res) => {
  usermodel
    .create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  usermodel
    .findById({ _id: id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  usermodel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    )
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/deleteuser/:id",(req,res)=>{
    const id = req.params.id;
    usermodel.findByIdAndDelete({_id:id})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
})

app.get("/", (req, res) => {
  usermodel
    .find({})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}`);
});
