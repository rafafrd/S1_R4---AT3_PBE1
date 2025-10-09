const express = require("express");
const app = express();
const PORT = 8081;

// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/alunos", (req, res) => {
  try {
    const { nome, notas } = req.body;
    // Validacao
    if (!nome || !notas) {
      return res.status(400).json({ message: "O nome e as notas são obrigatórios" });
    }
    if (notas.length === 0) {
      return res.status(400).json({ message: "O campo 'notas' deve ter pelo menos uma nota." });
    }
    let sum = 0;
    for (let i = 0; i < notas.length; i++) {
      if (typeof notas[i] === 'number') { // verifica se é número
        sum += notas[i];
      } else {
        return res.status(400).json({ message: `A nota '${notas[i]}' na posição ${i} não é um número válido.` });
      }
    }
    // retorna a média e a situação
    const media = sum / notas.length;
    const situacao = media >= 6 ? "APROVADO" : "REPROVADO";
    return res.status(200).json({ nome: nome, media: media.toFixed(2), situacao: situacao });

  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor", errorMessage: error.message });
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