"use strict";
const express = require("express");
const path = require('path');
const Newsletter = require("../Database/Newsletter");
let router = express.Router();

router.use(function(req, res, next) {
    next();
})

router
    .route("/:id/:email")
    .get( async (req, res) => {

        let data = {};
        res.json(data);
        
    })
    .post(async (req, res) => {
        try {
            Newsletter.findOneAndUpdate({_id: req.params.id, email: req.params.email}, { $set: {isSubscribed: false, reason: req.body.reason}}, async (err, result) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Error unsubscribing!"
                    });
                }
                else {
                    res.json({
                        success: true,
                        message: "Email unsubscribed!"
                    });
                }
            })            
        }      
        catch (e) {
            res.json({
                success: false,
                message: "Error unsubscribing!"
            });
        }  
    });

module.exports = router;