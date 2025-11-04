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

// Rotas de produtos (create protected to admin)
rotasAutenticadas.post("/produtos", adminAuth, produtoController.adicionar);
rotasAutenticadas.get("/produtos", produtoController.listar);

// Rotas de carrinho
rotasAutenticadas.post("/adicionarItem", carrinhoController.adicionarItem);
// remove a single item from cart
rotasAutenticadas.delete("/carrinho/item", carrinhoController.removerItem);
// update quantity for an item
rotasAutenticadas.patch("/carrinho/quantidade", carrinhoController.atualizarQuantidade);
// get the current user's cart
rotasAutenticadas.get("/carrinho", carrinhoController.listar);
// remove entire cart
rotasAutenticadas.delete("/carrinho", carrinhoController.remover);

export default rotasAutenticadas;