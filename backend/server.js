require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/mongo");
const apiRoutes = require("./src/application/routes/index.routes");

const app = express();

// Configurar CORS para desarrollo y producción
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ecommerce-frontend-kappa.vercel.app',
    'https://ecommerce-frontend-jesus-code2024s-projects.vercel.app',
     'https://ecommerce-frontend-eight-opal.vercel.app/'
  ],
  credentials: true
}));

app.use(express.json());

// Conectar DB
connectDB();

// Rutas
app.use("/api", apiRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`)
);
