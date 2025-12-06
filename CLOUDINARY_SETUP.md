# 📸 Configuración de Cloudinary - Guía Rápida

## ✅ Cloudinary integrado exitosamente

Las imágenes ahora se guardan en **Cloudinary** en lugar de localmente.

## 🔑 Paso 1: Crear cuenta en Cloudinary

1. Ve a [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Crea una cuenta gratuita
3. Una vez dentro, ve al **Dashboard**

## 📋 Paso 2: Obtener credenciales

En el Dashboard de Cloudinary encontrarás:

```
Cloud Name: tu_cloud_name
API Key: 123456789012345
API Secret: abc123def456ghi789jkl
```

## ⚙️ Paso 3: Configurar en el backend

Abre el archivo `.env` y reemplaza los valores:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name_real
CLOUDINARY_API_KEY=tu_api_key_real
CLOUDINARY_API_SECRET=tu_api_secret_real
```

## 🚀 Paso 4: Reiniciar el servidor

Después de configurar las credenciales:

```bash
cd backend
npm run dev
```

## ✨ Beneficios de Cloudinary

- ☁️ **Almacenamiento en la nube** - No se pierden al reiniciar el servidor
- 🌍 **CDN global** - Carga rápida en todo el mundo
- 🖼️ **Optimización automática** - Las imágenes se optimizan automáticamente
- 📏 **Transformaciones** - Redimensiona al vuelo (ya configurado: max 1000x1000px)
- 💰 **Plan gratuito** - 10GB de almacenamiento, 25GB de ancho de banda/mes
- 🔒 **Seguro** - Respaldos automáticos

## 📁 Estructura en Cloudinary

Tus imágenes se guardarán en:
```
ecommerce/productos/nombrearchivo.jpg
```

## 🔗 URLs generadas

Antes (local):
```
http://localhost:4000/uploads/productos/imagen.jpg
```

Ahora (Cloudinary):
```
https://res.cloudinary.com/tu_cloud_name/image/upload/v1234567890/ecommerce/productos/imagen.jpg
```

## ⚠️ Importante

- Reinicia el servidor backend después de configurar las credenciales
- Reinicia Next.js si ya estaba corriendo (para cargar la nueva config)
- Las imágenes antiguas en `uploads/` ya no se usarán
- Puedes eliminar la carpeta `uploads/` si quieres

## 🧪 Probar

1. Configura las credenciales en `.env`
2. Reinicia el backend
3. Ve a `/admin/productos`
4. Crea un producto con imágenes
5. Las imágenes se subirán a Cloudinary automáticamente
6. Verifica en el Dashboard de Cloudinary que aparezcan

## 📊 Monitoreo

Puedes ver todas tus imágenes subidas en:
- Dashboard de Cloudinary > Media Library
- Carpeta: `ecommerce/productos`
