const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/register',(req,res) => {
        //req.body.email;
        //req.body.username;
        //req.body.password;
        if(!req.body.email){
            res.json({success:false,message:'you must provide an email'});
        }else{
        
        if(!req.body.username){
            res.json({success:false,message:'you must provide a username'});
        }else{
            if(!req.body.password){
                res.json({success:false,message:'you must provide an password'});
            }else{
                let user = new User({
                    email:req.body.email.toLowerCase(),
                    username:req.body.username.toLowerCase(),
                    password:req.body.password
                });
        user.save((err) =>{
            if(err){
                
                if(err.code===11000){
                    res.json({success:false,message:'username or email already exists'});    
                }else if(err.errors){
                        if(err.errors.email){
                            res.json({success:false,message:err.errors.email.message});
                        }else {
                            if(err.errors.username){
                                res.json({success:false,message:err.errors.username.message});
                        }else {
                            if(err.errors.password){
                                res.json({success:false,message:err.errors.password.message});
                            }else {
                            res.json({success:false,message:err
            });
        }
    }
}
                }else{
            
                res.json({success:false,message:'could not save user. Error:',err
            });
            }
        }else{
                res.json({success:true,message:'User saved'});
            }
        });
        
    


    }
}
        }
    });

    router.get('/checkEmail/:email', (req,res) =>{
        if(!req.params.email){
            res.json({succes:false, message:'email was not provided'});
        }else{
            User.findOne({email: req.params.email}, (err,user) =>{
                if(err){
                    res.json({success:false, message:err});
                }else{
                    if(user){
                        res.json({success:false, message: 'email is alsready taken'});
                    }else{
                        res.json({success:true, message:'email is available'});
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req,res) =>{
        if(!req.params.username){
            res.json({succes:false, message:'username was not provided'});
        }else{
            User.findOne({username: req.params.username}, (err,user) =>{
                if(err){
                    res.json({success:false, message:err});
                }else{
                    if(user){
                        res.json({success:false, message: 'username is alsready taken'});
                    }else{
                        res.json({success:true, message:'username is available'});
                    }
                }
            });
        }
    });

    router.post('/login', (req, res) =>{
       if(!req.body.username){
           res.json({success:false, message:'no username was provided'});
       }else{
           if(!req.body.password){
           res.json({success:false, message:'no password was provided'});
           }else{
               User.findOne({username: req.body.username.toLowerCase()},(err, user) =>{
                   if(err){
                       res.json({success:false, message: err});
                   }else{
                       if(!user){
                         res.json({success: false, message:'username not found'});  
                       }else{
                           const validPassword = user.comparePassword(req.body.password);
                        if(!validPassword){
                            res.json({success:false, message:'password invalid'});
                        }else{
                            const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
                            res.json({success:true, message:'success', token: token, user: { username: user.username}});
                        }                       
                    }
                   }
               });
           }
       }
    });
    
    router.use((req, res, next) =>{
        const token = req.headers['authorization'];
        if(!token){
            res.json({success:false, message:'no token provided'});
        }else{
            jwt.verify(token, config.secret, (err, decoded) =>{
                if(err){
                    res.json({success:false, message:'token invalid' + err});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/profile',(req, res) =>{
       User.findOne({_id: req.decoded.userId}).select('username email').exec((err, user) =>{
           if(err){
               res.json({success:false, message: err});
           }else{
               if(!user){
                   res.json({success:false, messages:'user not found'});
               }else{
                   res.json({success:true, user: user});
               }
           }
       });
    });

    router.get('/publicProfile/:username', (req, res) => {
        // Check if username was passed in the parameters
        if (!req.params.username) {
          res.json({ success: false, message: 'No username was provided' }); // Return error message
        } else {
          // Check the database for username
          User.findOne({ username: req.params.username }).select('username email').exec((err, user) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
            } else {
              // Check if user was found in the database
              if (!user) {
                res.json({ success: false, message: 'Username not found.' }); // Return error message
              } else {
                res.json({ success: true, user: user }); // Return the public user's profile data
              }
            }
          });
        }
      });


    return router;
}     
