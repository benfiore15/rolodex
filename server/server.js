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
const mgmtcollectionName= process.env.MGMT_MONGO_DB_COLLECTION;

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

app.listen(PORT, () => {
    console.log(`Hello world! \nServer is running on http://localhost:${PORT}`);
});


// Endpoint to log users into application
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Useranme: ${username} || Password: ${password}`)
    try {
        // const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);

        if ((username === 'cZebedee' && password === 'pass123') || (username === 'lCharter' && password === 'pass123') || (username === 'mGaine' && password === 'pass123')) {
            console.log(`Successful login for user ${username}`)

            let nameToFind = null;

            if (username === "mGaine") nameToFind = {"firstName": "Marilin", "lastName": "Gaine"}
            else if (username === "lCharter") nameToFind = {"firstName": "Luke", "lastName": "Charter"}
            else if (username === "cZebedee") nameToFind = {"firstName": "Christel", "lastName": "Zebedee"}
            console.log(`Looking for ${nameToFind.firstName + nameToFind.lastName}`)

            try {
                const client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                const user = await collection.findOne({first_name: nameToFind.firstName, last_name: nameToFind.lastName});
                
                if (user.job_role.includes("HR")) {
                    user.job_role = "HR"
                } else if (user.job_role.includes("Manager")) {
                    user.job_role = "MGMT"
                }
                console.log(`ROLE ASSIGNED ==> ${user.job_role}`)

                res.status(200).json({ success: true, message: 'Login successful!', userID: user._id, name: user.first_name + " " + user.last_name, role: user.job_role});
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

