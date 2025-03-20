const { MongoClient }  = require ("mongodb")


async function addMgmtIdToRecords() {
  const uri = "mongodb://localhost:27017"; // MongoDB URI (update if needed)
  const dbName = "rolodex"; // Your database name here
  const collectionName = "MGMT"; // Your collection name here

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define the Manager ID
    const managerId = "manager_123"; // Replace with specific manager ID logic

    // Find all documents to update
    const managers = await collection.find({}).toArray();

    let counter = 1; // Start the counter for unique hr_ids

    // Update each record with a custom mgmt_id
    for(const manager of managers) {
      const customManagerId = `MGMT-EMP-${String(counter).padStart(4, '0')}`; // Generate unique custom MGMT ID

      // Update the record
      await collection.updateOne(
        { _id: manager._id },
        { $set: { mgmt_id: customManagerId, manager_id: managerId } }
      );

      counter++; // Increment counter for the next record
    };
    console.log("All records updated with custom mgmt_id");
  
  } catch (err) {
    console.error("Error occurred while updating records:", err);
  } finally {
    await client.close();
  }
}

addMgmtIdToRecords();