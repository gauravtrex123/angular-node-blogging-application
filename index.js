const express = require('express');
const router = express.Router();
const app = express();
const mongoose=require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT ||8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('could not connect to',err);
    }else{
        console.log('connected to the database:'+config.db);
    }
});   

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

app.use(cors({
    origin:'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use('/authentication',authentication);
app.use('/blogs', blogs);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });
  
  app.listen(port,() => {
      console.log('listening on port'+port);
  });