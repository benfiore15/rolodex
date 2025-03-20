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
const hrcollectionName = process.env.HR_MONGO_DB_COLLECTION;
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