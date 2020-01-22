const express = require('express');
const path = require('path');
const bodyParser= require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// We have also added an extra check to redirect the users back to notfound.html to avoid ‘not found’ errors and for the sake of simplicity.
// send the user to notfound.html page inspite of the url
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'notfound.html'));
// });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
