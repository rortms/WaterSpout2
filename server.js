var express = require('express');
var app = express();
var server = app.listen(3030, function (){
    console.log("Listening on port 3030");
})

app.use(express.static('ws_app'));
    
