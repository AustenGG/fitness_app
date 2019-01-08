const express = require('express');
const app = express();
// const session  = require('express-session');
const port = 8080;

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => res.send({"code":400, "success":"Server running"}));
// if you want to view a hmtl file
// app.get('/page', (req, res) => res.sendFile(__dirname + '/views/page.html'));


app.listen(port, () => console.log(`The app is running on port: ${port}! Make sure to open it in your browser!`));
