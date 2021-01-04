// Requirements
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


// Express Routes
const index = require("./Routes/Index.js");
const pageNotFound = require("./Routes/PageNotFound.js");

// Setting Up Express
app.set('view enginer', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended: false}));
app.use(express.static('Client'));

// Routings
app.use("/", index);
app.use("/page_not_found", pageNotFound);

app.get("*", (req, res) => {
    return res.redirect("/page_not_found");    
});

app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT);
});

