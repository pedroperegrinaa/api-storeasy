<center><h1>API de Pagamentos Storeasy</h1></center>

<p align="center">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&color=#2C682C"/>
    <img src="https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white&color=#023430"/>
    <img src="https://img.shields.io/badge/swagger-6DA55F?style=for-the-badge&logo=swagger&logoColor=white&color=#62A03F"/>
</p>

## Criando o ambiente

    git clone https://github.com/pedroperegrinaa/api-storeasy.git
    cd api-storeasy
    echo "PORT=5000" >> .env
    echo "MONGODB_URI=" >> .env
    echo "PAGARME_WEBHOOK_URL=" >> .env
    echo "PAGARME_API_KEY=" >> env #ainda não tenho a key

## Rodando o projeto

    yarn install
    yarn start

Futuramente o `docker-compose.yml` será criado.

## Swagger

<!-- ```diff

@@ /carts @@

+ /GET
+ /POST
- /PUT
- /DELETE

@@ /transactions @@

- /POST

@@ /postbacks @@

- /PAGARME
``` -->

### /carts

✅ /GET

✅ /POST

❌ /PUT

✅ /DELETE

### /transactions

❌ /POST

## Demo:

Testes da API em: http://localhost:5000/doc
