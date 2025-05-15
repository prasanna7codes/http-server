const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ramdomharkiratilovekiara"
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })    

    res.json({
        message: "You are signed up"
    })

    console.log(users)
    
})


app.post("/signin", function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    
    let foundUser = null;

    for (let i = 0; i<users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username,
       }, JWT_SECRET) ;

        
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users)
})




function auth(req,res,next){
    const token = req.headers.token // jwt
    const decodedInformation = jwt.verify(token, JWT_SECRET);  // returns an object bcoz we encoded an object in the first place

    if(decodedInformation.username){

        req.username=decodedInformation.username;
        next();
    }

    else{
        res.json({
            message : "you are not loged in "
        })
    }



    
    
}


app.get("/get-password",auth, function(req, res) {
    
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.username)  {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.json({
            message: "user not found"
        })
    }


})


app.listen(3001)



