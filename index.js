//modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();

//port
var port = 3000;

//set folder
app.use(express.static(path.join(__dirname, 'BookClub')));

//cors mw
app.use(cors());

//body parser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//

//routes
const route = require('./routes/route');
app.use('/api', route);


//mongoDB
mongoose.connect('mongodb://localhost:27017/BookClub', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
    console.log("Connected to database @ 27017");
});

mongoose.connection.error('error',(err)=>{
    if (err) {
        console.log("Error in database connection:"+err);
    }
});

app.listen(port,function() {
    console.log("Server started at port:"+port);  
});
