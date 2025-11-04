import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import carrinhoController from "../carrinho/carrinho.controller.js";
import { Router } from "express";
import { adminAuth } from '../middleware/adm.js'

const rotasAutenticadas = Router();

// Rotas de usuários
rotasAutenticadas.post("/usuarios", usuarioController.adicionar);
rotasAutenticadas.get("/usuarios", usuarioController.listar);
// admin delete user
rotasAutenticadas.delete("/usuarios/:id", adminAuth, usuarioController.remover);
// admin explicit routes (aliases) for clarity
rotasAutenticadas.delete('/admin/usuario/:id', adminAuth, usuarioController.remover);

// Rotas de produtos (create protected to admin)
rotasAutenticadas.post("/produtos", adminAuth, produtoController.adicionar);
rotasAutenticadas.get("/produtos", produtoController.listar);
// editar e excluir produtos (admin)
rotasAutenticadas.put('/produtos/:id', adminAuth, produtoController.atualizar);
rotasAutenticadas.delete('/produtos/:id', adminAuth, produtoController.remover);

// Rotas de carrinho
rotasAutenticadas.post("/adicionarItem", carrinhoController.adicionarItem);
// remove a single item from cart (by body)
rotasAutenticadas.delete("/carrinho/item", carrinhoController.removerItem);
// update quantity for an item (body)
rotasAutenticadas.patch("/carrinho/quantidade", carrinhoController.atualizarQuantidade);
// alternativas RESTful com params
rotasAutenticadas.put('/carrinho/:produtoId/quantidade', carrinhoController.atualizarQuantidade);
rotasAutenticadas.delete('/carrinho/:produtoId', carrinhoController.remover);
// get the current user's cart
rotasAutenticadas.get("/carrinho", carrinhoController.listar);
// remove entire cart (admin can pass usuarioId via body)
rotasAutenticadas.delete("/carrinho", carrinhoController.remover);
// admin route to remove any user's cart by id (usuarioId)
rotasAutenticadas.delete('/admin/carrinho/:id', adminAuth, carrinhoController.remover);

export default rotasAutenticadas;