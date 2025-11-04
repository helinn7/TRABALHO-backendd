import { Request, Response } from 'express';
import { db } from '../database/banco-mongo.js';
class ProdutoController {
    async adicionar(req:Request, res:Response) {
        const {nome,preco,descricao,urlfoto} = req.body;
        const produto = {nome,preco,descricao,urlfoto};
        const resposta = await db.collection('produtos').insertOne(produto);
        res.status(201).json({...produto, _id: resposta.insertedId});
    }
    async listar(req:Request, res:Response) {
        const produtos = await db.collection('produtos').find().toArray();
        res.status(200).json(produtos);
    }
    async atualizar(req: Request, res: Response){
        const { id } = req.params;
        const { nome, preco, descricao, urlfoto } = req.body;
        if(!id) return res.status(400).json({ mensagem: 'Id do produto é obrigatório' });
        const ObjectId = require('bson').ObjectId;
        await db.collection('produtos').updateOne({_id: ObjectId.createFromHexString(id)}, {$set: { nome, preco, descricao, urlfoto }});
        const produtoAtualizado = await db.collection('produtos').findOne({_id: ObjectId.createFromHexString(id)});
        return res.status(200).json(produtoAtualizado);
    }
    async remover(req: Request, res: Response){
        const { id } = req.params;
        if(!id) return res.status(400).json({ mensagem: 'Id do produto é obrigatório' });
        const ObjectId = require('bson').ObjectId;
        await db.collection('produtos').deleteOne({_id: ObjectId.createFromHexString(id)});
        return res.status(200).json({ mensagem: 'Produto removido com sucesso' });
    }
}
export default new ProdutoController();