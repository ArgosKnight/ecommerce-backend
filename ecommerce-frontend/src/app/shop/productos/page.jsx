'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    categoriaId: '',
    busqueda: '',
  });

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    try {
      const { data } = await api.get('/productos');
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const { data } = await api.get('/categorias');
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const cumpleBusqueda = producto.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());
    const cumpleCategoria =
      !filtros.categoriaId || producto.categoriaId === filtros.categoriaId;
    return cumpleBusqueda && cumpleCategoria;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Catálogo de Productos
          </h1>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nombre del producto..."
                  value={filtros.busqueda}
                  onChange={(e) =>
                    setFiltros({ ...filtros, busqueda: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={filtros.categoriaId}
                  onChange={(e) =>
                    setFiltros({ ...filtros, categoriaId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
