const express = require("express");

const app = express();

let compras = [
  {
    id: 1,
    nome: "Arroz",
    quantidade: 1,
    preco: 15,
  },
  {
    id: 2,
    nome: "Feijão",
    quantidade: 2,
    preco: 61,
  },
];

app.use(express.json());
app.use(express.static("public"));

app.get("/compras", (req, res) => {
  res.json(compras);
});

app.post("/compras", (req, res) => {
  const novaCompra = {
    id: Date.now(),
    nome: req.body.nome,
    quantidade: Number (req.body.quantidade),
    preco: Number (req.body.preco),
  };

  compras.push(novaCompra);

  res.status(201).json(novaCompra);
});

app.put("/compras/:id", (req, res) => {
  const id = Number(req.params.id);

  const compra = compras.find((compra) => compra.id === id);

  if (!compra) {
    return res.status(404).json({
      mensagem: "Compra não encontrada.",
    });
  }

  compra.nome = req.body.nome;
  compra.quantidade = req.body.quantidade;
  compra.preco = req.body.preco;

  res.json(compra);
});

app.delete("/compras/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = compras.findIndex((compra) => compra.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Compra não encontrado.",
    });
  }

  const compraRemovida = compras.splice(indice, 1);

  res.json({
    mensagem: "Compra removido com sucesso.",
    compra: compraRemovida[0],
  });
});

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000");
});
