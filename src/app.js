require("dotenv");
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
require("./db/conn");
const Hire = require("./model/hire");
const { json } = require("express");
const cookieparser = require("cookie-parser");
const auth = require("./middleware/auth");
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.set("view engine", "hbs");


app.get("/",(req,res)=>{
  res.render("site")
})
app.get("/admin/addstudent",  (req, res) => {
  res.render("index");
});

app.get("/login", auth, (req, res) => {
  // console.log(`cookiessssss ${req.cookies.jwt}`);
  res.render("login");
});

// Adding Record Of Student By Admin and token being generated and cookie being assigned for authentication

app.post("/admin/addstudent", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      const user = new Hire({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        physics: req.body.physics,
        maths: req.body.maths,
        chem: req.body.chem,
        confirmpassword: req.body.confirmpassword,
      });
      // console.log("success" + user);
      const token = await user.generateToken();
      console.log("token part  " + token);

      res.cookie("jwt", token, {
        httpOnly: true,
      });
      const createUser = await user.save();
      res.status(201).send("Record Inserted In The Database");
    } else {
      res.send("password not matching");
    }
  } catch (error) {
    res.send(error);
  }
});

// Deleting Record Of Student By Admin
app.get("/admin/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Hire.findByIdAndDelete({ _id });
    res.send(studentData);
  } catch (err) {
    res.send(err);
  }
});

// Updating Record Of Student By Admin
app.get("/admin/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Hire.findByIdAndUpdate(
      { _id },
      { physics: "39" }
    );
    res.send(studentData);
  } catch (err) {
    res.send(err);
  }
});

// Login For Student And token being generated  and cookie being assigned for authentication

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`${email} and ${password}`);
    const useremail = await Hire.findOne({ email });
    //res.send(useremail.password)

    const token = await useremail.generateToken();
    console.log("token part  " + token);

    res.cookie("jwt", token, {
      httpOnly: true,
    });

     console.log(`cookie is ${req.cookies.jwt}`);

    if (useremail.password === password) {
      res.send("Login Successful....This is the login page");
      //res.send(usermail.name)
    } else {
      res.send("invalid email");
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(8000, () => {
  console.log("Connection established");
});
