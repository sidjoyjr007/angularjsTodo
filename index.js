const express=require("express");
const app=express();
const port=process.env.port || 3000;
const routes=require('./routes')
let bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo',routes)
app.get('*',function(req,res){
    res.sendfile("public/index.html")
})

app.listen(port);