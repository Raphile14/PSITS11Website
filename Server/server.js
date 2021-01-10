// Requirements
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require("./Database/Connection.js");
const app = express();
const cors = require('cors');

// API Routes
const blog = require("./API/Blog.js");
const contact = require("./API/Contact.js");
const login = require("./API/Login.js");
const register = require("./API/Register.js");
const newsletter = require("./API/Newsletter.js");
const newsletterUnsubscribe = require("./API/NewsletterUnsubscribe.js");

// Connect to MongoDB
connectDB();

// Setting Up Express
app.set('view enginer', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended: false}));
app.use(express.static('Client'));
app.use(cors());

// Routings
app.use("/blog", blog);
app.use("/contact/send", contact);
app.use("/auth/login", login);
app.use("/auth/register", register);
app.use("/newsletter/subscribe/new", newsletter);
app.use("/newsletter/subscribe/unsubscribe", newsletterUnsubscribe);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT);
});

