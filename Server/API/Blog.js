"use strict";
const express = require("express");
const path = require('path');
const Blog = require('../Database/Blog.js');
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
            Blog.find({}, async (err, existingBlogs) => {
                data = existingBlogs;
                res.json(data);
            });            
        }

        // Specific Query
        else {
            Blog.find({_id: req.params.articleid}, async (err, existingBlogs) => {
                data = existingBlogs;
                res.json(data);
            });
        }        
    })
    .post();

module.exports = router;