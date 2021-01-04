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

        let data = {};
        res.json(data);
        
    })
    .post();

module.exports = router;