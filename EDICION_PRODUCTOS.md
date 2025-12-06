# 📝 Guía de Edición de Productos con Imágenes

## ✅ Funcionalidad Implementada

Los administradores pueden editar productos incluyendo la actualización de imágenes desde el panel de administración.

## 🎯 Características

### Panel de Administración (`/admin/productos`)
- ✅ Listar todos los productos
- ✅ Crear nuevos productos con imágenes
- ✅ **Editar productos existentes**
- ✅ Cambiar estado activo/inactivo
- ✅ Visualizar imágenes actuales al editar
- ✅ Reemplazar imágenes al actualizar

## 📸 Cómo Editar Productos con Imágenes

### 1. Acceder al Panel de Admin
- Inicia sesión como administrador
- Ve a `/admin/productos`

### 2. Editar un Producto
1. Click en el botón **"Editar"** del producto deseado
2. Se abrirá el modal con los datos actuales
3. Se mostrarán las imágenes existentes (si las hay)
4. Modifica los campos que necesites:
   - Nombre
   - Descripción
   - Precio
   - Stock
   - Categoría

### 3. Actualizar Imágenes
- **Mantener imágenes actuales**: No selecciones nuevos archivos
- **Reemplazar imágenes**: Selecciona nuevos archivos de imagen
  - Se pueden seleccionar hasta 5 imágenes
  - Formatos aceptados: JPG, PNG, WEBP
  - Tamaño máximo: 5MB por imagen

### 4. Guardar Cambios
- Click en **"Actualizar"**
- Verás una notificación de éxito
- Los cambios se reflejarán inmediatamente en la lista

## 🔧 Detalles Técnicos

### Backend
- **Ruta**: `PUT /api/productos/:id`
- **Autenticación**: Requiere token JWT y rol ADMIN
- **Content-Type**: `multipart/form-data`
- **Middleware**: Multer para manejo de archivos
- **Almacenamiento**: Carpeta `uploads/productos/`

### Frontend
- **Componente**: `/admin/productos/page.jsx`
- **Tecnología**: Next.js 15 + React
- **Upload**: FormData para envío de archivos
- **Preview**: Visualización de imágenes actuales

### API Request Example (FormData)
```javascript
const formData = new FormData();
formData.append('nombre', 'Producto Actualizado');
formData.append('descripcion', 'Nueva descripción');
formData.append('precio', '149.99');
formData.append('stock', '25');
formData.append('categoriaId', 'id-categoria');
formData.append('imagenes', archivo1); // Opcional
formData.append('imagenes', archivo2); // Opcional

await api.put(`/productos/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

## 🌐 URLs de Imágenes

Las imágenes se acceden vía:
```
http://localhost:4000/uploads/productos/nombre-archivo.jpg
```

En producción, asegúrate de:
- Configurar `NEXT_PUBLIC_API_URL` en el frontend
- Servir la carpeta `uploads` correctamente
- Considerar usar un servicio de almacenamiento en la nube (AWS S3, Cloudinary, etc.)

## ⚠️ Notas Importantes

1. **Validaciones**:
   - Solo administradores pueden editar
   - Campos requeridos: nombre, precio, categoriaId
   - Las imágenes son opcionales al editar

2. **Imágenes**:
   - Al subir nuevas imágenes, se reemplazan las actuales
   - Si no seleccionas archivos, se mantienen las existentes
   - Las imágenes antiguas permanecen en el servidor (considera limpiarlas periódicamente)

3. **Seguridad**:
   - Los archivos se validan por tipo MIME
   - Límite de tamaño de 5MB por imagen
   - Nombres de archivo únicos con timestamp

## 🚀 Próximas Mejoras (Opcionales)

- [ ] Eliminar imágenes individuales en lugar de reemplazar todas
- [ ] Drag & drop para reordenar imágenes
- [ ] Crop y resize de imágenes
- [ ] Integración con Cloudinary o AWS S3
- [ ] Eliminación automática de imágenes huérfanas
