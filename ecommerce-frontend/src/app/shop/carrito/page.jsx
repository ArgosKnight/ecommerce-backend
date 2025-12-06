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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [paymentData, setPaymentData] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
  });

  const [direccion, setDireccion] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: 'Perú',
    telefono: '',
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

    if (!direccion.direccion || !direccion.ciudad || !direccion.codigoPostal || !direccion.telefono) {
      alert('Por favor completa todos los campos de la dirección de envío');
      return;
    }

    // Abrir modal de pago
    setShowPaymentModal(true);
  };

  const procesarPago = async () => {
    // Validar datos de pago
    if (paymentMethod === 'tarjeta') {
      if (!paymentData.numeroTarjeta || !paymentData.nombreTitular || !paymentData.fechaVencimiento || !paymentData.cvv) {
        alert('Por favor completa todos los datos de la tarjeta');
        return;
      }
      
      // Validar formato de tarjeta
      if (paymentData.numeroTarjeta.replace(/\s/g, '').length !== 16) {
        alert('Número de tarjeta inválido');
        return;
      }
    }

    setLoading(true);
    try {
      // Simular procesamiento de pago (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pedidoData = {
        items: items.map((item) => ({
          productoId: item.producto._id || item.producto.id,
          cantidad: item.cantidad,
          precio: item.producto.precio,
        })),
        direccionEnvio: direccion,
      };

      await api.post('/pedidos', pedidoData);
      clearCart();
      setShowPaymentModal(false);
      alert('¡Pago procesado exitosamente! Pedido creado.');
      router.push('/shop/pedidos');
    } catch (error) {
      alert(error.response?.data?.error || error.response?.data?.mensaje || 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
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
              {items.map((item, index) => (
                <div
                  key={`${item.producto.id}-${index}`}
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
                    placeholder="Dirección completa (Calle y número)"
                    value={direccion.direccion}
                    onChange={(e) =>
                      setDireccion({ ...direccion, direccion: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={direccion.ciudad}
                    onChange={(e) =>
                      setDireccion({ ...direccion, ciudad: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="País"
                    value={direccion.pais}
                    onChange={(e) =>
                      setDireccion({ ...direccion, pais: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={direccion.telefono}
                    onChange={(e) =>
                      setDireccion({ ...direccion, telefono: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
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
                  Continuar al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pago */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Procesar Pago
                </h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Resumen del pedido */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Resumen del Pedido</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">S/ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-medium">S/ 10.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-600 pt-2 border-t border-blue-200">
                    <span>Total a pagar:</span>
                    <span>S/ {(getTotal() + 10).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Método de Pago</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('tarjeta')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      paymentMethod === 'tarjeta'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="font-medium text-gray-900">Tarjeta</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      paymentMethod === 'efectivo'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">💵</div>
                    <div className="font-medium text-gray-900">Efectivo</div>
                  </button>
                </div>
              </div>

              {/* Formulario de tarjeta */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      value={paymentData.numeroTarjeta}
                      onChange={(e) => 
                        setPaymentData({
                          ...paymentData,
                          numeroTarjeta: formatCardNumber(e.target.value)
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      placeholder="JUAN PEREZ"
                      value={paymentData.nombreTitular}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          nombreTitular: e.target.value.toUpperCase()
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength="5"
                        value={paymentData.fechaVencimiento}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setPaymentData({
                            ...paymentData,
                            fechaVencimiento: value
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength="3"
                        value={paymentData.cvv}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cvv: e.target.value.replace(/\D/g, '')
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    <span className="font-medium">⚠️ Simulación:</span> Este es un pago simulado. Puedes usar cualquier número de tarjeta.
                  </div>
                </div>
              )}

              {/* Mensaje para efectivo */}
              {paymentMethod === 'efectivo' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💵</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pago Contra Entrega</h4>
                      <p className="text-sm text-gray-600">
                        Podrás pagar en efectivo cuando recibas tu pedido. El repartidor llevará cambio si lo necesitas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={procesarPago}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    `Pagar S/ ${(getTotal() + 10).toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
