'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';

export default function CarritoPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, getTotal } =
    useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [direccion, setDireccion] = useState({
    calle: '',
    ciudad: '',
    codigoPostal: '',
    pais: 'Perú',
  });

  if (!isAuthenticated || user?.rol !== 'CLIENTE') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acceso Restringido
            </h2>
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión como cliente para acceder al carrito
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleCrearPedido = async () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!direccion.calle || !direccion.ciudad || !direccion.codigoPostal) {
      alert('Por favor completa la dirección de envío');
      return;
    }

    setLoading(true);
    try {
      const pedidoData = {
        items: items.map((item) => ({
          productoId: item.producto.id,
          cantidad: item.cantidad,
          precio: item.producto.precio,
        })),
        direccionEnvio: direccion,
      };

      await api.post('/pedidos', pedidoData);
      clearCart();
      alert('¡Pedido creado exitosamente!');
      router.push('/shop/pedidos');
    } catch (error) {
      console.error('Error al crear pedido:', error);
      alert(error.response?.data?.mensaje || 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <button
              onClick={() => router.push('/shop/productos')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Ver Productos
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carrito de Compras
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items del carrito */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.producto.id}
                  className="bg-white rounded-lg shadow-md p-4 flex gap-4"
                >
                  <div className="relative w-24 h-24 bg-gray-200 rounded flex-shrink-0">
                    {item.producto.imagenes &&
                    item.producto.imagenes.length > 0 ? (
                      <Image
                        src={item.producto.imagenes[0]}
                        alt={item.producto.nombre}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.producto.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      S/ {item.producto.precio.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.producto.id,
                              item.cantidad - 1
                            )
                          }
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.cantidad}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.producto.id,
                              item.cantidad + 1
                            )
                          }
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.producto.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      S/{' '}
                      {(item.producto.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Resumen y dirección */}
            <div className="space-y-4">
              {/* Dirección de envío */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Dirección de Envío
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Calle y número"
                    value={direccion.calle}
                    onChange={(e) =>
                      setDireccion({ ...direccion, calle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={direccion.ciudad}
                    onChange={(e) =>
                      setDireccion({ ...direccion, ciudad: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Código Postal"
                    value={direccion.codigoPostal}
                    onChange={(e) =>
                      setDireccion({
                        ...direccion,
                        codigoPostal: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="País"
                    value={direccion.pais}
                    onChange={(e) =>
                      setDireccion({ ...direccion, pais: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del Pedido
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>S/ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>S/ 10.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>S/ {(getTotal() + 10).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCrearPedido}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-400"
                >
                  {loading ? 'Procesando...' : 'Crear Pedido'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
