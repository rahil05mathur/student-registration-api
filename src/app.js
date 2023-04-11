const express = require("express");
const app = express();
const path = require("path");
const es6 = require("es6");
const db = require("./db/plug");
const port = process.env.port || 8000;
const hbs = require("hbs");
const Register = require("./models/register");
const bcrypt = require("bcryptjs");
const { request } = require("http");
const { Router } = require("express");

const Studentrouter = require("../src/routers/student")


const securePassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const passwordHashcomp = await bcrypt.compare(password, passwordHash);
    console.log(passwordHashcomp);
}

securePassword("mathur@23");
// const mainWeb = path.join(__dirname, "../public/css/style.css")
// app.use(express.static(mainWeb));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
const temp_path = path.join(__dirname, "../templates/views");
app.set("views", temp_path);

const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

// const title_path = path.join(__dirname, "../templates/partials")
// hbs.registerPartials(title_path);

app.use(Studentrouter);

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/register', (req, res) => {
    res.render("register");
})

app.get('/login', (req, res) => {
    res.render("login");
})

// app.get('/', async (req, res) => {

//     const userEmail = document.getElementById("email")
//     const userPassword = document.getElementById("password")
//     const fname = document.getElementById("firstname")

//     function login(loginform) {
//         if (loginform.userEmail.value && loginform.userPassword.value) {
//             var username = fname.value;
//         }
//     }
// });


// create a new user in db with the help of post method
app.post('/register', async (req, res) => {
    try {

        const password = req.body.password;
        const conf_password = req.body.confirmpassword;

        if (password === conf_password) {
            const registerstudent = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: conf_password
            })

            // password security algorithm

            await registerstudent.save();
            res.status(201).render("index");
        }
        else {
            res.send("password not matched")
        }

    }
    catch (err) {
        res.status(400).send(err);
    }
})


// login form validation

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email });

        const isMatched = await bcrypt.compare(password, useremail.password);

        if (isMatched) {
            res.status(201).render("index");
        }
        else {
            res.send("Invalid login details");
        }
    }
    catch (err) {
        // console.log(err);
        res.status(400).send("Invalid login details")
    }
})


app.listen(port, () => {
    console.log(`connection is successful at port ${port}`);
});