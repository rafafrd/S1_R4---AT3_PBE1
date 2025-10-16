const express = require("express");
const app = express();
const PORT = 8081;

/** 
  Crie um projeto que contenha uma rota POST /soma e receba uma quantidade indefinida de números através do body e realize a soma dos valores: 
  Verifique se os valores são numéricos antes de realizar o cálculo, ignore os não númericos, some os demais..
  Utilize a função reduce, pesquise em fontes na internet a forma de utilizar.
*/
// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/soma", (req, res) => {
  try {
    const { num } = req.body; // transforma dados em variaveis
    // Validacao
    if (!num) {
      return res.status(400).json({ message: "Insira Valores" });
    } else {
      let arrayCerta = [];
      let soma = 0;
      // lendo array
      for (let i = 0; i < num.length; i++) {
        if (isNaN(num[i])) {
          console.log(`${num[i]} não é um número`);
          continue; // pula pro próximo
        } else {
          arrayCerta[i] = Number(num[i]);
          console.log("arrayCerta: ", arrayCerta);
          // Utilizando reduce
          soma = arrayCerta.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0); // depois da verificação adiciona o valor na soma em formato de acumulador
          console.log("soma", soma);
        }
      }
      return res.status(201).json({ soma: soma });
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