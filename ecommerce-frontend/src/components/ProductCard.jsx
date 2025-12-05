'use client';

import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';

export default function ProductCard({ producto }) {
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  const handleAddToCart = () => {
    addItem(producto, 1);
    alert('Producto agregado al carrito');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="relative h-48 bg-gray-200">
        {producto.imagenes && producto.imagenes.length > 0 ? (
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Sin imagen
          </div>
        )}
        {!producto.activo && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            No disponible
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {producto.nombre}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {producto.descripcion}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            S/ {producto.precio.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {producto.stock}
          </span>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <Link
            href={`/shop/productos/${producto.id}`}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-center text-sm"
          >
            Ver Detalles
          </Link>
          {user?.rol === 'CLIENTE' && producto.activo && producto.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
