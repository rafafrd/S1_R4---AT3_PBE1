const express = require("express");
const app = express();
const PORT = 8081;

// 1. Crie um projeto que contenha uma rota POST /alunos que receba:
// {
//   "nome": "Ana",
//   "notas": [8, 7, 9, 6]
// }
// Calcular a média e retornar um JSON com nome, média e situação (APROVADO ou REPROVADO).
// Considere acima de 6 para aprovado.

// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/alunos", (req, res) => {
  try {
    const { nome, notas } = req.body;
    if (!nome || !notas) {
      // Validacao de dados
      res.status(400).json({ message: "Dados invalidos" });
    } else {
      const sum = 0;
      for (let i = 0; i < notas.length; i++) {
        // Roda dentro do set do json pegando os valores
        sum += notas[i];
      }
      const media = sum / notas.length; // n de notas
      if (media >= 6) {
        res.status(201).json({ nome: nome, media: media, situacao: "APROVADO" });
      } else {
        res.status(201).json({ nome: nome, media: media, situacao: "REPROVADO" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "erro", errorMessage: error.message });
  }
});
// ==============================================================================
// config padrão
app.use((req, res) => {
  res.status(404).send(`Página não encontrada`);
});

app.listen(PORT, () => {
  console.log(`Servidor respondendo em: http://localhost:${PORT}`);
});
