const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
require("dotenv").config();
// console.log(process.env);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/views/contact.html");
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: "dnedeva.webdev@gmail.com",
      pass: process.env.PASS_KEY
    }
  })

  const mailOptions = {
    from: req.body.name,
    to: "dnedeva.webdev@gmail.com",
    subject: req.body.subject,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (err, info)=>{
    if (err){
      console.log(err);
      res.send("There is an error!");
    }else{
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  })
})

app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/public/views/projects.html");
});

app.listen(PORT, () => {
  console.log("App is running on port "+PORT);
})
