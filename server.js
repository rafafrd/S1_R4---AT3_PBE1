const express = require("express");
const app = express();
const PORT = 8081;

// Crie um projeto que contenha uma rota POST /soma e receba uma quantidade indefinida de números através do body e realize a soma dos valores:
// Verifique se os valores são numéricos antes de realizar o cálculo, caso não seja informa ao usuário e não realizar o cálculo.
// Utilize a função reduce, pesquise em fontes na internet a forma de utilizar.

// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/soma", (req, res) => {
  try {
    const { num } = req.body; // transformar dados em variaveis
    // Validacao
    if (!num) {
      return res.status(400).json({ message: "Insira Valores Validos" });
    } else {
      for (let i = 0; i < num.length; i++) { // lendo dados
        if (isNaN(num[i])) {
          return res.status(400).json({ message: "Insira Apenas Valores Numéricos" }); // quebra se for True
        } else {
          const soma = num.reduce((acumulador, valorAtual) => acumulador + valorAtual,0); // add no acumulador o valor atual do loop ([i])
          return res.status(201).json({ soma: soma });
        }
      }
    }
  } catch (error) {
    res.status(500).json({errorMessage: error.message}); // erro no server
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