<center><h1>API de Pagamentos Storeasy</h1></center>

<p align="center">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&color=#2C682C"/>
    <img src="https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white&color=#023430"/>
    <img src="https://img.shields.io/badge/swagger-6DA55F?style=for-the-badge&logo=swagger&logoColor=white&color=#62A03F"/>
</p>

## Criando o ambiente

```bash
git clone https://github.com/pedroperegrinaa/api-storeasy.git

cd api-storeasy

echo "PORT=5000" >> .env
```

## Rodando o projeto

Instale o `pnpm`: 

```bash
npm install -g pnpm
```
Inicie o projeto:

```bash
pnpm install
pnpm start
```


Endpoints da API em: http://localhost:5000/doc

## .env

Para o backend funcionar direito, você precisa completar esse arquivo no `.env` com tudo que falta:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tsnode
PAGARME_API_PUBLIC_KEY=
PAGARME_API_PRIVATE_KEY=
API_URL: https://api.pagar.me/core/v5
BASIC=
```

- **MONGODB_URI**: URI do mongodb. Usei o mongodb pelo docker, recomendo que faça o mesmo por conta da facilidade.
-  **PAGARME_API**: Colete as 2 keys no site do [pagarme](https://pagar.me)
- **BASIC**: Key depois de passar por um Basic64. Precisa disso pra acessar a API, é **importante**. Olhe a [doc do pagar.me](http://docs.pagar.me/reference/)

