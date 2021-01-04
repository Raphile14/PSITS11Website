"use strict";
const express = require("express");
const path = require('path');
let router = express.Router();

router.use(function(req, res, next) {
    next();
})

router
    .route("/:articleid")
    .get((req, res) => {

        let data = {};

        // All Query
        if (req.params.articleid == "all") {

        }

        // Specific Query
        else {

        }
        res.json(data);
    })
    .post();

module.exports = router;