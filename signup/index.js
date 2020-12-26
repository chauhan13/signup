//jshint esversion:6

const express=require("express");
const request=require("request");
const https=require("https")
const app=express();
const bodyParser=require("body-parser");
const { response } = require("express");
const { send } = require("process");

app.use(bodyParser.urlencoded({extended:true}));

app.use('*/css',express.static('public/css'));
app.use('*/imsges',express.static('public/imsges'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const Name=req.body.Name;
    const Lastname=req.body.Last;
    const Email=req.body.Email;

    const data={
        members:[
            {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:Name,
                LNAME:Lastname
            }
            }

        ]

    }

    const jsonData=JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/d8f3f6c330";
    const options={
        method:"POST",
        auth:"carteldairo:3589b619061c42a2ad3bb00e45d26961-us7"
    };

    const request=https.request(url,options,function(responce){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/fail.html");
        }
        else{
                res.sendFile(__dirname+"/fail.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server in running on port 3000");
});


//api key=3589b619061c42a2ad3bb00e45d26961-us7
//uniq id key=d8f3f6c330