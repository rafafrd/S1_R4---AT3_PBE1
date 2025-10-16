const express = require("express");
const fs = require("fs");
const path = require("path"); // add caminhos de arquivos
const app = express();
const PORT = 8081;

/**  Crie um projeto com uma rota POST /usuarios que receba um JSON com:
  - nome, email e senha;
  - Nome deve ter no minimo 3 caracteres, email deve conter @ e senha no mínimo 4 caracteres
  - Salvar o registro em um arquivo usuarios.json na raiz da aplicação (o arquivo deve ser criado através da codificação)
*/
// middleware para utilização de JSON
app.use(express.json());
// ==============================================================================
app.post("/usuarios", (req, res) => {
  try {
    const { nome, email, senha } = req.body; // cria as variaveis que seram lidas no json

    // Validações 
    if (!nome || nome.length < 3) {
      return res.status(400).json({ message: "Nome deve ter no mínimo 3 caracteres" });
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Email deve conter @" });
    }
    if (!senha || senha.length < 4) {
      return res.status(400).json({ message: "Senha deve ter no mínimo 4 caracteres" });
    }

    // onde salvar o arquivo (__dirname salva no local atual do código)
    const caminhoDoArquivo = path.join(__dirname, "usuarios.json");

    // lê se já existe o arquivo
    // fs.readFile(file[, options], callback)#
    // file <string> | <Buffer> | <integer> filename or file descriptor
    // options <Object> | <string>
    // encoding <string> (utf8) | <null> default = null
    // flag <string> default = 'r'
    // callback <Function>
    // err <Error>
    // data <string> | <Buffer></Buffer>

    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      let usuarios = [];
      if (!err && data) {
        usuarios = JSON.parse(data);
      }

      // add array
      const novoUsuario = { nome, email, senha };
      usuarios.push(novoUsuario);

      // escreve o array atualizado no arquivo    |     JSON.stringify(value, replacer, space)

      fs.writeFile(caminhoDoArquivo,JSON.stringify(usuarios, null, 2),
        (writeErr) => {
          if (writeErr) {
            return res.status(500).json({ message: "Erro ao salvar usuário." }); // erro no servidor
          }
          return res.status(201).json({ message: "Usuário salvo com sucesso!" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message }); // erro no servidor
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
