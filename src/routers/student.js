const express = require('express');
const router = new express.Router();
const Student = require("../models/register");


// create new students
router.post("/register", async (req, res) => {

    try {
        /*with the help of req.body we get the data from the postman body*/
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

// read the students data from db
router.get("/registers", async (req, res) => {

    try {
        const students_ka_data = await Student.find();
        res.send(students_ka_data)
    }
    catch (e) {
        res.send();
    }
})

// get the individual student data from the db
router.get("/registers/:id", async (req, res) => {

    try {
        const Id = req.params.id;
        const student_ka_data = await Student.findById(Id)

        if (!student_ka_data) {
            return res.status(404).send();
        }
        else {
            res.send(student_ka_data)
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
})

// delete the students by it's id

router.delete("/registers/:id", async (req, res) => {
    try {
        // const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }
    catch (e) {
        res.status(500).send(e); 
    }
})


//  update the students by it's id
router.patch("/registers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.send(updateStudents);
    }
    catch (e) {
        res.status(404).send(e);
    }
})

module.exports = router;