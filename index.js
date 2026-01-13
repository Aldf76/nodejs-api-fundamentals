const express = require('express');
const app = express();
const contatosRoutes = require("./routes/contatos.js");
require('dotenv').config();
const connectDatabase = require('./banco-de-dados/config.js');

connectDatabase();

app.use("/contatos", contatosRoutes);
app.get("/", (req, res) => {
  res.send("Api rodando! Coloque as rotas corretamente");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
