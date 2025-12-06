require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/mongo");
const apiRoutes = require("./src/application/routes/index.routes");

const app = express();

// Configurar CORS para desarrollo y producción
app.use(cors({
  origin: [
    'http://localhost:3000',  // Desarrollo local
    'https://ecommerce-backend-2kz1jd68o-jesus-code2024s-projects.vercel.app', // Vercel preview
    process.env.FRONTEND_URL  // URL de producción personalizada (configurar en .env de Render)
  ].filter(Boolean),  // Filtrar valores undefined
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
