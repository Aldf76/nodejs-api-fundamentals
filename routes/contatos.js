const express = require('express');
const router = express.Router();
const clientPromise = require("../banco-de-dados/config");

router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("meu-db"); 
    const contatos = await db.collection("contatos").find({}).toArray();
    res.json(contatos);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    res.status(500).json({ error: "Erro ao buscar contatos" });
  }
});
router.get('/:id', (req, res) => {
  res.send(`Usuário de id ${req.params.id}`);
});
router.post('/', (req, res) => {
  const { texto } = req?.body;
  res.json({ recebido: texto });
});
module.exports = router;