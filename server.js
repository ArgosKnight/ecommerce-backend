require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/mongo");
const apiRoutes = require("./src/application/routes/index.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas
app.use("/api", apiRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`)
);
