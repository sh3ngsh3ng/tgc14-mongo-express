const express = require('express')
const hbs = require('hbs');
const wax = require('wax-on')
const MongoUtil = require('./MongoUtil')

// setup dotenv library
// const dotenv = require('dotenv');
// dotenv.config();
// OR:
require('dotenv').config(); // <-- nodejs will read the content of the .env
                            // file and put the variables inside there
                            // into the operating system

// how to access varaible in operating system?
// console.log(process.env.MONGO_URI);

let app = express();
// use handlebars for the view engines
app.set('view engine', 'hbs');
// set the public folder to store all the static files
app.use(express.static('public'));

// enable template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({extended: false}));

// ROUTES
async function main(){
    console.log(process.env.MONGO_URI)
    await MongoUtil.connect(process.env.MONGO_URI, "sample_airbnb");


    app.get('/', async function(req,res){
        let records = await MongoUtil.getDB()
                                     .collection('listingsAndReviews')
                                     .find()
                                     .limit(10)
                                     .toArray();

        res.render('listing',{
            'records': records
        })
    })
}

main();

app.listen(3000, function(){
    console.log("Server has started")
});