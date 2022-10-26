const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    //Get this in mailchimp (Audience->Manage Audience->Settings->Scroll to the bottom)
    const uniqueListId = '0118ac38e9';

    //Get this from url in the address bar while signed in to your mail chimp account
    const dataCenter = 'us21';

    console.log(firstName, lastName, email);

    const options = {
        url: 'https://' + dataCenter + '.api.mailchimp.com/3.0/lists/' + uniqueListId,
    }

    request(options, function(err, response, body){

    });
});

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});


//API_key
//5022849099cb660c8f8417937e176d50-us21

//Unique_list_id
//0118ac38e9