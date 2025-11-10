import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Load environment variables first
dotenv.config();

// Check if environment variables are defined
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI não está definida nas variáveis de ambiente. Crie um arquivo .env com MONGO_URI');
}

// Create MongoDB client
const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.MONGO_DB || 'ecommerce';
let db = client.db(dbName);

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        db = client.db(dbName);
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    });

// Graceful shutdown
process.on('SIGINT', () => {
    client.close()
        .then(() => {
            console.log('Conexão com MongoDB fechada');
            process.exit(0);
        })
        .catch(console.error);
});

export { db };
export type Role = 'admin' | 'user';

export interface JwtPayloadWithRole {
  userId: string;
  role: Role;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'troque_esta_chave';

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token ausente' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayloadWithRole;
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

export function requireRole(...allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayloadWithRole | undefined;
    if (!user) return res.status(401).json({ error: 'Não autenticado' });
    if (!allowed.includes(user.role)) return res.status(403).json({ error: 'Acesso negado' });
    next();
  };
}