const { randomUUID } = require("crypto");
const { MongoClient }  = require ("mongodb")


async function addHrIdToRecords() {
  const uri = "mongodb://localhost:27017"; // MongoDB URI (update if needed)
  const dbName = "rolodex"; // Your database name here
  const collectionName = "HR"; // Your collection name here

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define the HR manager ID
    const hrManagerId = "hr_manager_123"; // Replace with specific manager ID logic

    // Find all documents to update
    const hr_employees = await collection.find({}).toArray();

    let counter = 1; // Start the counter for unique hr_ids

    // Update each record with a custom hr_id
    for(const employee of hr_employees) {
      const customHrId = `HR-EMP-${String(counter).padStart(4, '0')}`; // Generate unique custom HR ID

      // Update the record
      await collection.updateOne(
        { _id: employee._id },
        { $set: { hr_id: customHrId, manager_id: hrManagerId } }
      );

      counter++; // Increment counter for the next record
    };
    console.log("All records updated with custom hr_id");
  
  } catch (err) {
    console.error("Error occurred while updating records:", err);
  } finally {
    await client.close();
  }
}

addHrIdToRecords();