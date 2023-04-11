const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/studentsregistration", {


}).then(() => {
    console.log("connection is established successfully");
}).catch((e) => {
    console.log("No connection");
});