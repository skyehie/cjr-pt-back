import express from "express";
import prisma from "./prisma";

const app = express();
app.use(express.json());


app.post("/produtos", async (req, res) => {
  try {
    const { loja_id, categoria_id, nome, descricao, preco, estoque } = req.body;

    const produto = await prisma.produto.create({
      data: {
        loja_id: Number(loja_id),
        categoria_id: Number(categoria_id),
        nome,
        descricao,
        preco: preco.toString(), 
        estoque: Number(estoque),
      },
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar produto" });
  }
});


app.get("/produtos", async (_req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});


app.get("/produtos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const produto = await prisma.produto.findUnique({ where: { id } });

  if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

  res.json(produto);
});


app.put("/produtos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { loja_id, categoria_id, nome, descricao, preco, estoque } = req.body;

    const produto = await prisma.produto.update({
      where: { id },
      data: {
        loja_id: Number(loja_id),
        categoria_id: Number(categoria_id),
        nome,
        descricao,
        preco: preco?.toString(),
        estoque: Number(estoque),
      },
    });

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao atualizar produto" });
  }
});


app.delete("/produtos/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.produto.delete({ where: { id } });
    res.json({ message: "Produto deletado com sucesso" });
  } catch {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Servidor rodando em http://localhost:3000")
);