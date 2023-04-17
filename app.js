require('dotenv').config() 
const express = require("express")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mongoDB = process.env.MONGO
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

const User = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  })
)

const app = express();
app.set("views", __dirname)
app.set("view engine", "ejs")

app.use(session({ secret: "rocks", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => res.render("index"))
app.get("/sign-up", (req, res) => res.render("sign-up"))

app.listen(3000, () => console.log("app listening on local, port 3000!"))