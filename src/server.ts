import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

interface ProdutoBody {
    loja_id: number | string;
    categoria_id: number | string;
    nome: string;
    descricao: string;
    preco: string | number;
    estoque: number | string;
}
app.post("/produtos", async (req: Request<{}, {}, ProdutoBody>, res: Response) => {
    try {
        const { loja_id, categoria_id, nome, descricao, preco, estoque } = req.body;

        const produto = await prisma.produto.create({
            data: {
                loja_id: Number(loja_id),
                categoria_id: Number(categoria_id),
                nome,
                descricao,
                preco: String(preco), 
                estoque: Number(estoque),
            },
        });

        res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao criar produto" });
    }
});

app.get("/produtos", async (_req: Request, res: Response) => {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
});

app.get("/produtos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const produto = await prisma.produto.findUnique({ where: { id } });

    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    res.json(produto);
});

app.put("/produtos/:id", async (req: Request<{ id: string }, {}, Partial<ProdutoBody>>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { loja_id, categoria_id, nome, descricao, preco, estoque } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        
        const data: any = {};
        if (loja_id !== undefined) data.loja_id = Number(loja_id);
        if (categoria_id !== undefined) data.categoria_id = Number(categoria_id);
        if (nome !== undefined) data.nome = nome;
        if (descricao !== undefined) data.descricao = descricao;
        if (preco !== undefined) data.preco = String(preco);
        if (estoque !== undefined) data.estoque = Number(estoque);

        const produto = await prisma.produto.update({
            where: { id },
            data, 
        });

        res.json(produto);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Produto não encontrado ou erro ao atualizar" });
    }
});
app.delete("/produtos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        await prisma.produto.delete({ where: { id } });
        res.json({ message: "Produto deletado com sucesso" });
    } catch (error: any) {
        if (error.code === 'P2025') {
             return res.status(404).json({ error: "Produto não encontrado" });
        }
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

app.listen(3000, () =>
    console.log("🚀 Servidor rodando em http://localhost:3000")
);