'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';

export default function AdminCategoriasPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
  });

  useEffect(() => {
    if (isAuthenticated && user?.rol === 'ADMIN') {
      cargarCategorias();
    }
  }, [isAuthenticated, user]);

  const cargarCategorias = async () => {
    try {
      const { data } = await api.get('/categorias');
      const categoriasArray = Array.isArray(data) ? data : (data.categorias || []);
      setCategorias(categoriasArray);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/categorias/${editando}`, formData);
        alert('Categoría actualizada');
      } else {
        await api.post('/categorias', formData);
        alert('Categoría creada');
      }

      setShowModal(false);
      setEditando(null);
      resetForm();
      cargarCategorias();
    } catch (error) {
      alert(error.response?.data?.error || error.response?.data?.mensaje || 'Error al guardar categoría');
    }
  };

  const handleEditar = (categoria) => {
    const categoriaId = categoria._id || categoria.id;
    setEditando(categoriaId);
    setFormData({
      nombre: categoria.nombre,
    });
    setShowModal(true);
  };

  const handleEliminar = async (categoria) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    
    const id = categoria._id || categoria.id;
    
    try {
      await api.delete(`/categorias/${id}`);
      alert('Categoría eliminada');
      cargarCategorias();
    } catch (error) {
      console.error('Error al eliminar:', error.response?.data);
      alert(error.response?.data?.error || 'Error al eliminar categoría');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
    });
  };

  if (!isAuthenticated || user?.rol !== 'ADMIN') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acceso Restringido
            </h2>
            <p className="text-gray-600 mb-4">Solo administradores</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Categorías
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/productos')}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Ver Productos
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setEditando(null);
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                + Nueva Categoría
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Cargando categorías...</p>
            </div>
          ) : categorias.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No hay categorías creadas</p>
              <button
                onClick={() => {
                  resetForm();
                  setEditando(null);
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Crear Primera Categoría
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorias.map((categoria, index) => (
                <div
                  key={categoria._id || categoria.id || index}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {categoria.nombre}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditar(categoria)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(categoria)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editando ? 'Editar Categoría' : 'Nueva Categoría'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Electrónica"
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditando(null);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {editando ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
