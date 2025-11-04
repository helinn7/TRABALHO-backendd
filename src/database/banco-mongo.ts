import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB)

export { db };

import dotenv from 'dotenv';

dotenv.config();

if (!client) {
    throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
}
