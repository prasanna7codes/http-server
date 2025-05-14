const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    //  vvv Changed lines vvv
    console.log(`URL: ${req.url}`);
    console.log(`Method: ${req.method}`);
    const date = new Date();
    console.log(`Timestamp: ${date.toISOString()}`);
    //  ^^^ Changed lines ^^^
    next();
});

app.get('/ride1', function (req, res) {
    res.json({
        message: "you have riden the ride1"
    });
});

app.listen(3001, () => {
    //  vvv Added line vvv
    console.log("Server is running on port 3001");
    //  ^^^ Added line ^^^
});
