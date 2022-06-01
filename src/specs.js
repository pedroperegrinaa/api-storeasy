import swaggerJsdoc from "swagger-jsdoc";

console.log(__dirname);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Storeasy API",
      version: "1.0.0",
      description: "API do sistema de pagamentos da Storeasy",
      contact: {
        name: "Pedro Peregrina",
        email: "pedrosilva1p333@gmail.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "test API",
      },
    ],
  },
  apis: ["./routes/carts.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
