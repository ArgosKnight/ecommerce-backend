# 🚀 Guía de Despliegue - E-commerce Full Stack

## 📦 Estructura del Proyecto
```
ecommerce-backend/    (Backend Express + MongoDB)
ecommerce-frontend/   (Frontend Next.js)
```

---

## 🎯 OPCIÓN RECOMENDADA: Backend en Render + Frontend en Vercel

### 1️⃣ DESPLEGAR BACKEND EN RENDER.COM (GRATIS)

#### Paso 1: Preparar el Backend
```bash
cd backend
```

Asegúrate de tener estos archivos:

**package.json** - Verificar scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Paso 2: Crear cuenta en Render
1. Ve a https://render.com
2. Regístrate con GitHub
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio
5. Selecciona la carpeta `backend`

#### Paso 3: Configurar en Render
- **Name**: `ecommerce-api` (o el que prefieras)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

#### Paso 4: Variables de Entorno en Render
Agregar en la sección "Environment":
```
MONGO_URI=mongodb+srv://robbie:robbie123@cluster0.yx4w6a6.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=4000
JWT_SECRET=tu_secreto_jwt_super_seguro
CLOUDINARY_CLOUD_NAME=dxjojlo31
CLOUDINARY_API_KEY=813988811815411
CLOUDINARY_API_SECRET=L8jRnV38lk_0pPtpLavDWT4f-jo
```

#### Paso 5: Deploy
- Click "Create Web Service"
- Espera 5-10 minutos
- Tu backend estará en: `https://ecommerce-api-xxxx.onrender.com`

⚠️ **IMPORTANTE**: Copia la URL de tu backend, la necesitarás para el frontend.

---

### 2️⃣ DESPLEGAR FRONTEND EN VERCEL

#### Paso 1: Preparar el Frontend
```bash
cd ecommerce-frontend
```

Crear archivo `.env.production`:
```bash
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```
(Reemplaza con tu URL de Render del paso anterior)

#### Paso 2: Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Regístrate con GitHub
3. Click en "Add New" → "Project"
4. Selecciona tu repositorio
5. Selecciona la carpeta `ecommerce-frontend`

#### Paso 3: Configurar en Vercel
- **Framework Preset**: Next.js (autodetectado)
- **Root Directory**: `ecommerce-frontend`
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)

#### Paso 4: Variables de Entorno en Vercel
En la sección "Environment Variables":
```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```
(Reemplaza con tu URL de Render)

#### Paso 5: Deploy
- Click "Deploy"
- Espera 2-5 minutos
- Tu frontend estará en: `https://tu-proyecto.vercel.app`

---

## 🔧 CONFIGURACIÓN CORS EN BACKEND

Actualiza `backend/server.js` para permitir el dominio de Vercel:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tu-proyecto.vercel.app'  // ⬅️ Agregar tu dominio de Vercel
  ],
  credentials: true
}));
```

Luego haz push y Render se actualizará automáticamente.

---

## ✅ VERIFICACIÓN

### Probar Backend:
```bash
curl https://tu-backend.onrender.com/api/productos
```

### Probar Frontend:
1. Abre `https://tu-proyecto.vercel.app`
2. Intenta registrarte
3. Ve a productos
4. Prueba agregar al carrito

---

## 🐛 PROBLEMAS COMUNES

### Backend no responde (Render)
- ⏱️ **Sleep después de 15 min de inactividad** (tier gratuito)
- Primera petición tarda 30-60 segundos en "despertar"
- Solución: Usar un servicio de ping o actualizar a plan pago

### CORS Error
- Verificar que la URL del frontend esté en el CORS del backend
- Verificar que `NEXT_PUBLIC_API_URL` tenga `/api` al final

### Variables de entorno no funcionan
- En Vercel: Las variables deben empezar con `NEXT_PUBLIC_`
- Después de cambiar variables, hacer re-deploy

### 404 en rutas de Next.js
- Verificar que el `Root Directory` en Vercel esté correcto
- Verificar que `next.config.js` no tenga conflictos

---

## 🎉 RESULTADO FINAL

✅ Backend: `https://ecommerce-api-xxxx.onrender.com`
✅ Frontend: `https://ecommerce-xxxx.vercel.app`
✅ Base de datos: MongoDB Atlas (ya configurado)
✅ Imágenes: Cloudinary (ya configurado)

---

## 💰 COSTOS

| Servicio | Plan | Costo |
|----------|------|-------|
| Render | Free Tier | $0 |
| Vercel | Hobby | $0 |
| MongoDB Atlas | M0 Free | $0 |
| Cloudinary | Free | $0 |
| **TOTAL** | | **$0/mes** |

⚠️ Limitaciones tier gratuito:
- Render: Sleep después de 15 min inactivo, 750 hrs/mes
- Vercel: 100 GB bandwidth, 100 despliegues/día
- MongoDB: 512 MB storage
- Cloudinary: 25 GB storage, 25k transformaciones/mes

---

## 🔄 ACTUALIZACIONES AUTOMÁTICAS

Una vez configurado:
1. Haces push a GitHub
2. Render detecta cambios en `backend/` → Re-deploy automático
3. Vercel detecta cambios en `ecommerce-frontend/` → Re-deploy automático

---

## 📚 ALTERNATIVAS

### Backend:
- **Railway.app** (Más rápido que Render, $5/mes después de créditos)
- **Fly.io** (Más técnico, buen tier gratuito)
- **Heroku** (Requiere tarjeta, $7/mes mínimo)

### Frontend:
- **Netlify** (Similar a Vercel)
- **Cloudflare Pages** (Muy rápido, gratis)

---

## 🆘 SOPORTE

Si tienes problemas:
1. Revisa los logs en Render/Vercel
2. Verifica variables de entorno
3. Prueba las URLs con curl/Postman
4. Revisa la consola del navegador (F12)
