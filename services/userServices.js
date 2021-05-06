const config = require('../config/config');
const response = require('../config/responses');
const commonHelpers = require('../helpers/commonHelpers');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

//User Registration
const userSignup = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.story_digital_db);

        // request parameters
        let email = req.body.email;
        let userName = req.body.userName;
        let password = req.body.password;
        let mobile = req.body.mobile;

        // validating request parameters
        let isEmailValid = await commonHelpers.validateEmail(email);
        let isNameValid = await commonHelpers.validateName(userName);
        let isMobileValid = await commonHelpers.validateMobile(mobile);
        // if want can add formatting to use entered value. i.e. can make its first letter capital and other small of name. (example - entered value -> 'suprIYa paTil' format to -> 'Supriya Patil')

        if (isEmailValid && isNameValid && password && isMobileValid) {
            let user = {
                email,
                userName,
                password: bcrypt.hashSync(password, 8), //Password Hash
                mobile
            }

            // inserting into database
            let result = await dba.collection(config.usersCollection).insertOne(user);
            if (result.insertedCount) {
                res.status(200).send(response.successful_signup)
            } else {
                res.status(400).send(response.failed_to_signup)
            }
        } else {
            res.status(400).send(response.invalid_parameters)

        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        })
    }
}

module.exports.userSignup = userSignup;

//User Login
const userLogin = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.story_digital_db);

        var email = req.body.email;
        var password = req.body.password;

        if (email && password) {
            //retrieving data from db
            let result = await dba.collection(config.usersCollection).find({
                email: req.body.email
            }).project({
                password: 1
            }).toArray();

            if (result.length) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);

                if (!passwordIsValid) return res.status(401).send({
                    auth: false,
                    token: null
                });

                // token generation
                let token = jwt.sign({
                    id: result[0]._id
                }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                app.locals.email = email;

                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000),
                    httpOnly: true,
                    secure: false // set it to true only if app is using https
                });
                
                //Cookie configuration
                try {
                    // read cookies
                    console.log(req.cookies)

                    let options = {
                        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                        httpOnly: true, // The cookie only accessible by the web server
                        signed: false // Indicates if the cookie should be signed
                    }

                    // Set cookie
                    res.cookie('cookieName', token, options) // options is optional
                    // res.send('')
                } catch (error) {
                    res.send(400)

                }

                res.status(200).send({
                    auth: true,
                    token: token
                });


            } else {
                res.status(400).send(response.invalid_loggin_credentials);
            }
        } else {
            res.status(400).send(response.invalid_loggin_credentials);
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }

}

module.exports.userLogin = userLogin;

//Creation of a Blog post
const createPost = async (req, res) => {
    try {

        // request parameters
        let title = req.body.title;
        let createdBy = req.userId; // current login user id
        let date = req.body.date;
        let detailedText = req.body.detailedText;

        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.story_digital_db);

        var data_obj = {
            title,
            createdBy,
            date,
            detailedText
        }
        var result = await dba.collection(config.blogsCollection).insertOne(data_obj);
        if (result.insertedCount) {
            res.status(200).send(response.successful_insert)
        } else {
            res.status(400).send(response.failed_to_insert)
        }

    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        })
    }
}

module.exports.createPost = createPost;

//Get all the posts of blog
const getAllPost = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.story_digital_db);

        // retrieving all posts' data from database
        let result = await dba.collection(config.blogsCollection).find().toArray();
        console.log(result)
        if (result.length) {
            res.status(200).send({
                data: result
            });
        } else {
            res.status(400).send(response.no_data_found);
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }

}

module.exports.getAllPost = getAllPost;

//Deleting a post created by a user (an authentic user can delete his own created post)
const deletePost = async (req, res) => {
    try {
        // database object setup
        const db = req.app.locals.db;
        let dba = db.db(config.story_digital_db);

        // request params
        let postId = req.body.postId;

        if (postId) {
            // deleteing post from database using postId
            let result = await dba.collection('blogs').find({
                $and: [{
                        createdBy: req.userId
                    },
                    {
                        _id: ObjectId(postId)
                    }
                ]
            }).toArray()

                if (result.length) {
                     await dba.collection(config.blogsCollection).deleteOne({ _id: ObjectId(postId) });
                    res.status(200).send(response.successful_delete);
                } else {
                    res.status(400).send(response.user_not_valid);
                }
        } else {
            res.status(400).send(response.invalid_parameters)
        }
    } catch (error) {
        res.status(400).send({
            msg: error.errmsg
        });
    }
}

module.exports.deletePost = deletePost;