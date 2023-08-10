// ---- IMPORT variables environnements ----
const dotenv = require("dotenv");
dotenv.config();

// ---- IMPORT express & INIT app express ----
const express = require("express");
const app = express();

// ---- IMPORT router ----
const router = require("./app/router");

// ---- SETTING view Engine EJS ----
app.set("view engine", "ejs");
app.set("views", "./app/views");

// ---- SETTING static folder ----
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte

// ---- SETTING routes ----
app.use(router);

// ---- Middleware 404 ----
app.use(handleError);

// ---- LISTEN server ----
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});