/**
 * Created by JFCS on 2/26/16.
 */
var express = require('express');

var index = require('./routes/index');
var characters = require('./routes/characters');
var comic = require('./routes/comics');
var series = require('./routes/series');
var app = express();


app.use(express.static('server/public'));

app.use('/characters',characters);
app.use('/comic',comic);
app.use('/series',series);
app.use('/',index);

var server = app.listen(3000,function(){
   var port = server.address().port;
    console.log('now listening on port : ', port);
});


