"use strict";
const express = require("express");
const path = require('path');
const Newsletter = require("../Database/Newsletter");
let router = express.Router();

router.use(function(req, res, next) {
    next();
})

router
    .route("/")
    .get( async (req, res) => {

        let data = {};
        res.json(data);
        
    })
    .post(async (req, res) => {
        try {
            Newsletter.findOne({email: req.body.email}, async (err, existingEmail) => {                
                if (err) {
                    res.json({
                        success: false,
                        message: "Error saving the subscription!"
                    });
                }
                if (existingEmail == null) {
                    let data = {};
                    data.firstName = req.body.firstName;
                    data.lastName = req.body.lastName;
                    data.email = req.body.email;
                    data.isSubscribed = true;
                    data.reason = null;

                    let dataModel = new Newsletter(data);
                    dataModel.save();
                    res.json({
                        success: true,
                        message: "Subscription Success"
                    });
                }                
                else {
                    if (existingEmail.isSubscribed) {
                        res.json({
                            success: false,
                            message: "Email already subscribed!"
                        });
                    }      
                    else {
                        Newsletter.findOneAndUpdate({_id: existingEmail._id, email: existingEmail.email}, { $set: {isSubscribed: true, reason: null}}, async (err, result) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "Error Subscribing!"
                                });
                            }
                            else {
                                res.json({
                                    success: true,
                                    message: "Subscription Success!"
                                });
                            }
                        })                         
                    }              
                }
            });
        }      
        catch (e) {
            res.json({
                success: false,
                message: "Error saving the subscription!"
            });
        }  
    });

module.exports = router;