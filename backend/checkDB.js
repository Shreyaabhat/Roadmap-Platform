require('dotenv').config();
const { MongoClient } = require('mongodb');

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  console.log('Database name:', db.databaseName);
  const cols = await db.listCollections().toArray();
  console.log('Collections:', cols.map(c => c.name));
  const count = await db.collection('roadmaps').countDocuments();
  console.log('Roadmaps count:', count);
  if (count > 0) {
    const one = await db.collection('roadmaps').findOne({});
    console.log('Sample title:', one.title, '| isPublished:', one.isPublished);
  }
  await client.close();
}
check().catch(console.error);