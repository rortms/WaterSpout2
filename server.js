var port = 8888
var express = require('express');
var app = express();
var server = app.listen(port, function (){
    console.log("Listening on port " + port);
})

app.use(express.static('ws_app'));
    
