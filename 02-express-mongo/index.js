const express = require('express')
const hbs = require('hbs');

// setup dotenv library
// const dotenv = require('dotenv');
// dotenv.config();
// OR:
require('dotenv').config(); // <-- nodejs will read the content of the .env
                            // file and put the variables inside there
                            // into the operating system

// how to access varaible in operating system?
console.log(process.env.MONGO_URI);