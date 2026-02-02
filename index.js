const express = require('express');
const app = express();
const timesRoutes = require("./routes/times.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/times", timesRoutes);

app.get("/", (req, res) => {
  res.send("Api rodando! Coloque as rotas corretamente");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
