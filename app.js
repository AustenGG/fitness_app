const express = require('express');
const app = express();
// const session  = require('express-session');
const port = 8080;

app.get('/', (req, res) => res.send({"code":400, "success":"Server running"}));

app.listen(port, () => console.log(`The app is running on port: ${port}! Make sure to open it in your browser!`));
