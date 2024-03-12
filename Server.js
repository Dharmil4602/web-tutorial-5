const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.json());

const sampleUserData = [
  { id: "5abf6783", firstName: "ABC", email: "abc@abc.ca" },
  { id: "5abf674563", firstName: "XYZ", email: "xyz@xyz.ca" },
];

// Get API
app.get("/users", (req, res) => {
  console.log("Fetching users");
  res.json({
    message: "Users retrieved",
    success: true,
    users: sampleUserData,
  });
  console.log("Users retrieved");
});

app.post("/add", (req, res) => {
    const { email, firstName } = req.body;
    if (!firstName || !email) {
        res.status(400).json({message: "Please enter valid data", success: false});
    } else {
        const newUser = {
            id: `${Math.random().toString(36).slice(2)}`,
            firstName,
            email
        };
        sampleUserData.push(newUser);
        res.json({message: "User added", success: true});
    }
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, email } = req.body;
    const user = sampleUserData.find(user => user.id === id);
    if (!user) {
        res.status(404).json({message: "User not found", success: false});
    } else {
        user.firstName = firstName;
        user.email = email;
        res.json({message: "User updated", success: true});
    }
})

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = sampleUserData.find(user => user.id === id);
    if (!user) {
        res.status(404).json({message: "User not found", success: false});
    } else {
        res.json({success: true, user});
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
