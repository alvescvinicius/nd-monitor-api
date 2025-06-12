# 2404-api-node-express

Projeto utilizado no curso da Alura e renomeado para o atual.

## Git 

Clonar repositório criado para o curso AluraNodeBuscaPaginacao:

git clone https://github.com/alvescvinicius/AluraNodeBuscaPaginacao.git -b main

Criar nova branch sem histórico de commits:

Não usado nesse na nossa estrutura: git checkout --orphan 01-AluraNodeBuscaPaginacao

Criado pasta do projeto para separar as aulas direto na branch main: 01-AluraNodeBuscaPaginacao

Fazer commit:

git add .

git commit -m "Configuração inicial do repositório."

Enviar branch para o GitHub:

Caso fosse em branches separadas: git push origin 01-AluraNodeBuscaPaginacao

No nosso caso push direto na main: git push origin main

Fazer login no Git com a conta do GitHub SE NECESSÁRIO:

git config --global user.name "usuarioDoGitHub"

git config --global user.email seuEmailDoGitHub@email.com

## 01 - Deixando nossa API resiliente

Baixar API Rest da livraria criada no curso de Node Express e MongoDB:

https://github.com/alura-cursos/api-node-express-2/

Extrair a pasta da aplicação api-node-express-2-main no diretório local do repositorio AluraNodeBuscaPaginacao 
e alterar o nome para 01_NodeBuscaPaginacao.

Dentro de 01_NodeBuscaPaginacao executar npm install.

Instalar dotenv npm install dotenv@16.0.3 para criar arquivo .env e ignorar nos commits do git por conter no conection string do MongoDB.

*** No curso foi utilizado eslint para idenficar e corrigir erros de digitação como alta de " ou ; não estou utilizando devido a versão atual ser completamente diferente do curso.