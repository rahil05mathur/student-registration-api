const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
})

studentSchema.pre("save", async function (next) {

    if (this.isModified("password")); {
        console.log(`current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`current password after bcrypt is ${this.password}`);

        this.confirmpassword = undefined;
    }
   
    next();
});

// create a collection 

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register; 