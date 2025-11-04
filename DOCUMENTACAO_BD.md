# Documentação do Banco de Dados

Este documento descreve as coleções e operações principais usadas no backend do projeto.

Coleções:

- `usuarios`
  - Campos principais: `_id`, `nome`, `idade`, `email`, `senha` (hash), `role` (string: 'user' ou 'admin')
  - Operações:
    - find(): listar usuários -> `db.collection('usuarios').find().toArray()`
    - findOne({email}): buscar por email -> usado no login
    - insertOne(usuario): cadastro de usuário
    - deleteOne({_id: ObjectId}): remover usuário (admin)

- `produtos`
  - Campos principais: `_id`, `nome`, `preco`, `descricao`, `urlfoto`
  - Operações:
    - find(): listar produtos
    - insertOne(produto): adicionar produto (admin)
    - updateOne({_id}, {$set:{...}}): atualizar produto (admin)
    - deleteOne({_id}): remover produto (admin)

- `carrinhos`
  - Estrutura:
    - `usuarioId`: string (id do usuário)
    - `itens`: array de objetos { produtoId, quantidade, precoUnitario, nome }
    - `dataAtualizacao`: Date
    - `total`: number
  - Operações:
    - findOne({usuarioId}) - pega o carrinho do usuário
    - insertOne(carrinho) - cria um carrinho quando o primeiro item é adicionado
    - updateOne({usuarioId}, {$set:{itens, total, dataAtualizacao}}) - atualiza carrinho
    - deleteOne({usuarioId}) - esvazia/exclui carrinho

Prints:

Incluir prints do MongoDB Compass ou Atlas mostrando as coleções `usuarios`, `produtos` e `carrinhos`.

Explicações rápidas das operações:

- find(): recupera documentos que combinam com o filtro. Ex.: `db.produtos.find({categoria:'eletronicos'})`
- insertOne(doc): insere um documento. Ex.: `db.usuarios.insertOne({nome:'Ana', email:'ana@x', senha:'hash'})`
- updateOne(filtro, {$set: {...}}): atualiza campos do documento. Ex.: `db.produtos.updateOne({_id:ObjectId('...')}, {$set:{preco:100}})`
- deleteOne(filtro): remove documento que combine com o filtro.

Observação: Para segurança, as senhas são armazenadas como hash (bcrypt) e não devem ser exibidas nos prints.
