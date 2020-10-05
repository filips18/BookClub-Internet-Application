const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');

//multer
var multer  = require('multer')
var defStorage = multer.diskStorage({
    destination: './BookClub/src/assets/profilePictures',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var defStorage2 = multer.diskStorage({
    destination: './BookClub/src/assets/bookPictures',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: defStorage });
var upload2 = multer({ storage: defStorage2});

//nodemailer transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'projekatpiatestmail@gmail.com',
      pass: 'piaprojekat!1'
    }
});

//forgot password
router.put('/forgot-password', function(req, res){
    const email = req.body.email;
    
    User.findOne({email : email}).exec((err, user) =>{
        if(err || !user || !user.approved) 
            return res.status(400).json({error: "User with this email does not exist."});
        else  console.log(user); //user = user2.toObject();

        let link = "http://localhost:4200/reset-password/" + user._id;

        let mailOptions = {
            from: 'projekatpiatestmail@gmail.com',
            to: email,
            subject: 'Sending Email for password reset.',
            html: '<h1>Click on this link to reset your password</h1><p><a href="' + link + '"> link </a> </p>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
    })
});

//recaptcha
router.post("/token_validate", function(req, res){
    let token = req.body.recaptcha;
    const secretKey = "6LfVeMAZAAAAADuyaaHcla08AI5g_UR-dtD67ey4"; //the secret key from your google admin console;
    
    const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`
    
    if(token === null || token === undefined){
      res.status(201).send({success: false, message: "Token is empty or invalid"})
      return console.log("token empty");
    }
    
    request(url, function(err, response, body){
        //error
        if(err) {
            res.send({success: false, 'message': "error in recaptcha"});
        }
        
        //else
        body = JSON.parse(body);
      
        //check if the validation failed
        if(body.success !== undefined && !body.success){
            res.send({success: false, 'message': "recaptcha failed"});
            return console.log("failed")
        }
        
        //if passed response success message to client
        res.send({"success": true, 'message': "recaptcha passed"});
        
    })
});

//User
const User = require("../models/user");

router.get('/users', function(req, res, next){
    User.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

//add
router.post('/user', function(req, res, next){
    let newUser = req.body;
    console.log(newUser);
    User.insertMany(newUser,function(err, result){
        if(err) res.send(err);
        else res.send(result);
    });
});

//delete
router.delete('/user/:id', function(req, res, next){
    User.deleteOne({_id : req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//update
router.put('/user/:id', function(req, res, next){
    let user = req.body;

    User.updateOne({_id : req.params.id}, user, {}, function(err, result){
        if(err){
            res.json(err);
        }   
        else {
            res.json(result);
        }
    });
});

//Book
const Book = require("../models/book");

router.get('/books', function(req, res, next){
    Book.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

//add
router.post('/book', function(req, res, next){
    let newBook = req.body;
    Book.insertMany(newBook,function(err, result){
        if(err) {
            console.log(err);
            res.send(err);}
        else res.send(result);
    });
});

//delete
router.delete('/book/:id', function(req, res, next){
    Book.deleteOne({_id : req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//update
router.put('/book/:id', function(req, res, next){
    let book = req.body;
    Book.updateOne({_id : req.params.id}, book, {}, function(err, result){
        if(err){
            console.log(err);
            res.json(err);
        }   
        else {
            res.json(result);
        }
    });
});

//addFile user
router.post('/file', upload.single('fileKey'), function(req, res, next){
    let file = req.file;
    console.log(file);
});
//addFile book
router.post('/file2', upload2.single('fileKey'), function(req, res, next){
    let file = req.file;
    console.log(file);
});

//#Comment
const Comment = require("../models/comment");

router.get('/comments', function(req, res, next){
    Comment.find(function(err, comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    });
});
//add
router.post('/comment', function(req, res, next){
    let newComment = req.body;

    Comment.insertMany(newComment,function(err, result){
        if(err) res.send(err);
        else res.send(result);
    });
});

//update
router.put('/comment/:id', function(req, res, next){
    let comment = req.body;
    //ovo bi trebalo da radi nzm koji mu je
    Comment.updateOne({_id : req.params.id}, comment, {}, function(err, result){
        if(err){
            res.json(err);
        }   
        else {
            res.json(result);
        }
    });
});

//#Genre
const Genre = require("../models/genre");

//get
router.get('/genres', function(req, res, next){
    Genre.find(function(err, comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    });
});

//add
router.post('/genre', function(req, res, next){
    let newGenre = req.body;
    console.log(newGenre);
    Genre.insertMany(newGenre,function(err, result){
        if(err) res.send(err);
        else res.send(result);
    });
});

//delete
router.delete('/genre/:id', function(req, res, next){
    Genre.deleteOne({_id : req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//#Event
const Event = require("../models/event");

//get
router.get('/events', function(req, res, next){
    Event.find(function(err, comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    });
});

//add
router.post('/event', function(req, res, next){
    let newEvent = req.body;
    console.log(newEvent);
    Event.insertMany(newEvent,function(err, result){
        if(err) res.send(err);
        else res.send(result);
    });
});

//update
router.put('/event/:id', function(req, res, next){
    let event = req.body;
    //
    Event.updateOne({_id : req.params.id}, event, {}, function(err, result){
        if(err){
            res.json(err);
        }   
        else {
            res.json(result);
        }
    });
});

module.exports = router;