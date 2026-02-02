const express = require('express');
const app = express();
const router = express.Router();
const clientPromise = require("../banco-de-dados/config");
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("FelMed_db"); 
    const times = await db.collection("brasileirao").find({}).toArray();
    res.json(times);
  } catch (err) {
    console.error("Erro ao buscar times:", err);
    res.status(500).json({ error: "Erro ao buscar times" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const client = await clientPromise;
    const db = client.db("FelMed_db");
    const time = await db.collection("brasileirao").findOne({ _id: new ObjectId(id) });
    
    if (!time) {
      return res.status(404).json({ error: "Time não encontrado." });
    }
    
    res.json(time);
  } catch (err) {
    console.error("Erro ao buscar time:", err);
    res.status(500).json({ error: "Erro ao buscar time." });
  }
});

router.post('/', async (req, res) => {

  const  time = {
    nome: req.body.nome,
    cidade: req.body.cidade,
    estado: req.body.estado,
    titulos_nacionais: req.body.titulos_nacionais,
    fundacao: req.body.fundacao
  } ;
  try {
    const client = await clientPromise;
    const db = client.db("FelMed_db");
    const result = await db.collection("brasileirao").insertOne(time);

    res.status(201).json({ 
      message: "Time criado com sucesso!",
      id: result.insertedId 
    });
  } catch (error) {
    console.error("Erro ao criar time:", error);
    res.status(500).json({ error: "Erro ao criar time." });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;  
  const time = req.body;
  try {
     client = await clientPromise;
     const db = client.db("FelMed_db");
     const result = await db.collection("brasileirao").updateOne(
       { _id: new ObjectId(id) },
       { $set: time }
     );

      if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Time não encontrado." });
     }

     res.status(201).json({ message: "Time atualizado com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar time:", error);
    res.status(500).json({ error: "Erro ao atualizar time." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientPromise;
    const db = client.db("FelMed_db");
    const result = await db
      .collection("brasileirao")
      .deleteOne({ _id: new ObjectId(id)});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Time não encontrado." });
    }
    res.json({ message: "Time deletado com sucesso. " + id });
  } catch (err) {
    console.error("Erro ao deletar time:", err);
    res.status(500).json({ error: "Erro ao deletar time." });
  }
});

module.exports = router;