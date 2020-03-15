const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            let user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if(!valid){
                        return res.status(401).json({
                            message: 'Incorrect Password'
                        });
                    }
                    
                    const token = jwt.sign(
                        {userId: user._id},
                        'Randon secret key',
                        { expiresIn: '24h' }
                    );

                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
        }
    );
};