'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';

export default function ProductoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProducto();
  }, [params.id]);

  const cargarProducto = async () => {
    try {
      const { data } = await api.get(`/productos/${params.id}`);
      setProducto(data);
    } catch (error) {
      alert('Producto no encontrado');
      router.push('/shop/productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (cantidad > producto.stock) {
      alert('No hay suficiente stock');
      return;
    }
    addItem(producto, cantidad);
    alert('Producto agregado al carrito');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Cargando...</p>
        </div>
      </>
    );
  }

  if (!producto) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← Volver
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Imagen */}
              <div className="relative h-96 bg-gray-200 rounded-lg">
                {producto.imagenes && producto.imagenes.length > 0 ? (
                  <Image
                    src={producto.imagenes[0].startsWith('http') 
                      ? producto.imagenes[0] 
                      : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:4000'}${producto.imagenes[0]}`
                    }
                    alt={producto.nombre}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Detalles */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {producto.nombre}
                </h1>
                <p className="text-gray-600 mb-6">{producto.descripcion}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    S/ {producto.precio.toFixed(2)}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700">
                    <span className="font-semibold">Stock disponible:</span>{' '}
                    {producto.stock} unidades
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Estado:</span>{' '}
                    {producto.activo ? (
                      <span className="text-green-600">Disponible</span>
                    ) : (
                      <span className="text-red-600">No disponible</span>
                    )}
                  </p>
                </div>

                {user?.rol === 'CLIENTE' &&
                  producto.activo &&
                  producto.stock > 0 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cantidad
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={producto.stock}
                          value={cantidad}
                          onChange={(e) =>
                            setCantidad(parseInt(e.target.value) || 1)
                          }
                          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
