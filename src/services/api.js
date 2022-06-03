import axios from "axios";

const pagarmeApi = axios.create({
  baseURL: "https://api.pagar.me/core/v5",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: process.env.BASIC,
  },
});

export default pagarmeApi;
