"use strict";
const express = require("express");
const path = require('path');
let router = express.Router();

router.use(function(req, res, next) {
    next();
})

router
    .route("/")
    .get((req, res) => {
        res.render(path.join(__dirname, '../../Client/ejs/pages', 'index.ejs'));
    })
    .post();

module.exports = router;