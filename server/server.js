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
        console.log(people);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("ERROR: Unable to find people from server");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});