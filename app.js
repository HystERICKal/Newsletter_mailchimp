const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
    //Also get it at the end of your API key
    const dataCenter = 'us21';

    console.log(firstName, lastName, email);

    //Data to send to mailchimp with key value pairs that mailcimp will recognise
    //The key and parameters are obtained from mailchimp api documentation
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //Turn to flatpack JSON (basically a string int the JSON format)
    //This is actually what we send to mailchimp
    const jsonData = JSON.stringify(data);

    const url = 'https://' + dataCenter + '.api.mailchimp.com/3.0/lists/' + uniqueListId;

    //To know what options to use, go to https node module documentation
    const options = {
        method: 'POST',
        //The first part of the auth key (erick1) can be anything
        auth: 'erick1:21ad6f27db82e28982b73793f1fd00ab-us21'
    }

    //Send data to external resource
    
    //First, save the request to a constant called...request...lol
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

        //Check if successful and display the appropriate html page
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
    }); 

    //use the constant request created above to send the collected data to the mailchimp server
    request.write(jsonData);

    //Specifies the completion of a request
    request.end();
});

//redirect to homepage if failure is encountered
app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});


//API_key
//5022849099cb660c8f8417937e176d50-us21

//Unique_list_id
//0118ac38e9