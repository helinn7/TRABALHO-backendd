import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Check if environment variables are defined
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI não está definida nas variáveis de ambiente');
}

if (!process.env.MONGO_DB) {
    throw new Error('MONGO_DB não está definida nas variáveis de ambiente');
}

// Create MongoDB client and connect
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db(process.env.MONGO_DB);

export { db };
