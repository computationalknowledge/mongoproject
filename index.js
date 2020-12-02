require('./models/db')

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const bookController = require("./controllers/bookController");

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send(`
    <h1 style="text-align:center">Click here to get access to Chhabi's Book <b> <a href="/book/list">Database</a></b></h1>`)
});

app.set('views', path.join(__dirname, "/views/"))

app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
}))

app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log("server started at port 3000")
});

app.use("/book", bookController);