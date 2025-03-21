import express from "express";
// import socks from "../data/socks.json" assert { type: 'json'};
// console.log(socks);


import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors'

// MongoDB Connection Config
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const mgmtcollectionName = process.env.MGMT_MONGO_DB_COLLECTION;

// Server Port Config -- @ localhost 3000
const app = express();
const PORT = 3000;
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// console.log("Hello, world!")



// Endpoint to read and send JSON file content
app.get('/people', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const people = await collection.find({}).toArray();
        res.json(people);
        // console.log(people);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("ERROR: Unable to find people from server");
    }
});

app.get('/hr', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(hrcollectionName);
        const hr = await collection.find({}).toArray();
        res.json(hr);
        console.log(hr);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("ERROR: Unable to find human resources from server");
    }
});

app.get('/mgmt', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(mgmtcollectionName);
        const mgmt = await collection.find({}).toArray();
        res.json(mgmt);
        console.log(mgmt);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("ERROR: Unable to find managemnt from server");
    }
});

app.post('/predictSal', async (req, res) => {
    try {
        const {job_role, office_loc} = req.body;

        console.log(`DATA RECEIVED ==> \n LOCATION: ${office_loc} || \n ROLE: ${job_role}`)

        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{'job_role': job_role, 'office_loc': office_loc}])
        });
        const responseData = await response.json();
        res.json(responseData);
    } catch (error) {
        res.status(500).json({ message: 'Error sending data', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Hello world! \nServer is running on http://localhost:${PORT}`);
});


// Endpoint to log users into application
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Useranme: ${username} || Password: ${password}`)
    try {
        // const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);

        if ((username === 'cZebedee' && password === 'pass123') || (username === 'lCharter' && password === 'pass123') || (username === 'gLevet' && password === 'pass123')) {
            console.log(`Successful login for user ${username}`)

            let nameToFind = null;

            if (username === "cZebedee") nameToFind = { "firstName": "Christel", "lastName": "Zebedee" } // EMPLOYEE
            else if (username === "lCharter") nameToFind = { "firstName": "Luke", "lastName": "Charter" } // HR
            else if (username === "gLevet") nameToFind = { "firstName": "Godwin", "lastName": "Levet" } // MGMT
            console.log(`Looking for ${nameToFind.firstName + nameToFind.lastName}`)

            try {
                const client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                const user = await collection.findOne({ first_name: nameToFind.firstName, last_name: nameToFind.lastName });

                if (user.job_role.includes("HR")) {
                    user.job_role = "HR"
                } else if (user.job_role.includes("Manager")) {
                    user.job_role = "MGMT"
                }
                console.log(user)
                console.log(`ROLE ASSIGNED ==> ${user.job_role}`)
                console.log(`Who is their manager? ${user.manager_id}`)

                res.status(200).json({ success: true, message: 'Login successful!', userID: user._id, userEID: user.id, name: user.first_name + " " + user.last_name, role: user.job_role, managerID: user.manager_id });
            } catch (err) {
                console.error("Error:", err);
                res.status(500).send("ERROR: Unable to find user from server");
            }


        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

