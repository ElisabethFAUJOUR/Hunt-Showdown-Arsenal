// ---- IMPORT variables environnements ----
const dotenv = require("dotenv");
dotenv.config();

// ---- IMPORT express & INIT app express ----
const express = require("express");
const app = express();

// ---- IMPORTS  ----
const router = require("./app/router");
const render404Page = require('./app/middlewares/error404')

// ---- SETTING view Engine EJS ----
app.set("view engine", "ejs");
app.set("views", "./app/views");

// ---- SETTING static folder ----
app.use(express.static("public")); 

// ---- SETTING routes ----
app.use(router);

// ---- Middleware 404 ----
app.use(render404Page);

// ---- LISTEN server ----
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});