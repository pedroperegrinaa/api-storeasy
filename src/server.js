import dotenv from "dotenv/config";
import app from "./app.js";

app.listen(process.env.PORT || 3000);
