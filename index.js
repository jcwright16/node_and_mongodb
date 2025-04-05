// Importing express module
const express = require("express");

// Importing mongoose module
const mongoose = require("mongoose");
const port = 3000;
const app = express();

// Connect to database
mongoose.connect("mongodb://localhost/projectDG", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db = mongoose.connection;

app.use(express.json());

// For serving static HTML files
app.use(express.static('public'));

// Middleware for handling POST and PUT requests
app.use(express.urlencoded({ extended: true }));

// Handling the get request
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });

    // res.send("Hello World");
    return res.redirect("index.html");
});

// Define POST method
app.post("/formFillUp", (req, res) => {
    const name = req.body.name;
    const reason = req.body.reason;
    const email = req.body.email;
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const addressline = req.body.addressline;

    const data = {
        name: name,
        reason: reason,
        email: email,
        phone: phone,
        city: city,
        state: state,
        addressline: addressline,
    };

    db.collection("users").insertOne(data,
        (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Data inserted successfully!");
        });

    return res.redirect("formSubmitted.html");
});

// Starting the server on the 80 port
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});