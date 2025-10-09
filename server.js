const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 8081;

/** 
  Crie um projeto com uma rota POST /usuarios que receba um JSON com:
  - nome, email e senha;
  - Nome deve ter no minimo 3 caracteres, email deve conter @ e senha no mínimo 4 caracteres
  - Salvar o registro em um arquivo usuarios.json na raiz da aplicação (o arquivo deve ser criado através da codificação)
*/
// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/usuarios", (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    // Validacao
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Insira Valores válidos" });
    } else {
      if (nome.length < 3) {
        return res.status(400).json({ message: "Nome deve ter no mínimo 3 caracteres" });
      } else if (!email.includes("@")) {
        return res.status(400).json({ message: "Email deve conter @" });
      } else if (senha.length < 4) {
        return res.status(400).json({ message: "Senha deve ter no mínimo 4 caracteres" });
      } else {
        const novoUsuario = { nome, email, senha };
        let usuarios = [];
        }
      // return res.status(201).json({ message: "Salvo!"  });
    }
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
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