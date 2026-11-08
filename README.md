# EC02 – Funcionários | Startup de Tecnologia

**Disciplina:** Tecnologia de Construção de Software I · PUC Goiás  
**Aluno:** Brunno Alexcson de Carvalho

O sistema da Startup de Tecnologia permite cadastrar, listar, alterar e excluir funcionários. Cada registro contém ID, nome, idade, cargo e salário. Os dados ficam na memória do navegador enquanto a página está aberta. Ao recarregar a página, a lista volta a ficar vazia.

A seção **Relatórios** mostra os funcionários com salário acima de R$ 5.000,00, a média salarial, os cargos sem repetição e os nomes em maiúsculo. Os resultados são atualizados após cada cadastro, edição salva ou exclusão.

Cada exercício do enunciado corresponde a um commit, de **Exercício 1** a **Exercício 4**. O histórico mostra a evolução da mesma página.

## Executar com Docker

Use um terminal Ubuntu/WSL com Git instalado e Docker Engine em execução.

1. Na primeira vez, clone o repositório e entre na pasta do projeto.

   ```bash
   git clone https://github.com/brunnoalexcson/ec02-funcionarios.git
   cd ec02-funcionarios
   ```

2. Na raiz do repositório, onde está a pasta `src`, crie o container.

   ```bash
   sudo docker run -d --name ec02-funcionarios \
     -p 127.0.0.1:8081:80 \
     -v "$PWD/src:/usr/share/nginx/html:ro" \
     nginx:alpine
   ```

3. Abra [http://localhost:8081](http://localhost:8081) no navegador.

Nas próximas execuções, se o container `ec02-funcionarios` já estiver em execução, abra o endereço diretamente. Se estiver parado, inicie-o com o comando abaixo.

```bash
sudo docker start ec02-funcionarios
```

A porta 8081 evita conflito com o EC01, que usa a 8080. O Nginx serve os arquivos da pasta `src`. Depois de salvar uma alteração nessa pasta, atualize a página no navegador para vê-la.