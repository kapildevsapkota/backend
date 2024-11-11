const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signUp(req, res) {
    
    models.User.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                
                return res.status(409).json({
                    message: "Email already exists!"
                });
            } else {
                
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err) {
                        return res.status(500).json({ message: "Error generating salt", error: err.message });
                    }
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            return res.status(500).json({ message: "Error hashing password", error: err.message });
                        }

                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        };

                       
                        models.User.create(user)
                            .then(result => {
                                res.status(201).json({
                                    message: "User created successfully"
                                });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: "Something went wrong!",
                                    error: error.message
                                });
                            });
                    });
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message
            });
        });
}




function login(req, res) {
    // Find user by email
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                // If user not found, return an unauthorized error
                return res.status(401).json({
                    message: "Invalid credentials!"
                });
            }

            // Compare the password with the hashed password in the database
            bcryptjs.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error comparing passwords",
                        error: err.message
                    });
                }

                if (isMatch) {
                    // Generate a token with only the email in the payload
                    jwt.sign(
                        { email: user.email }, // payload only includes email now
                        process.env.JWT_KEY, 
                        { expiresIn: '1h' }, 
                        (err, token) => {
                            if (err) {
                                return res.status(500).json({
                                    message: "Error generating token",
                                    error: err.message
                                });
                            }

                            // Respond with success and token
                            res.status(200).json({
                                message: "Authentication successful!",
                                token: token
                            });
                        }
                    );
                } else {
                    // If password doesn't match, send an unauthorized error
                    res.status(401).json({
                        message: "Invalid credentials!"
                    });
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message
            });
        });
}





module.exports = {
    signUp: signUp,
    login: login
};
