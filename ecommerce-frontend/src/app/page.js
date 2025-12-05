import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenido a Nuestro E-Commerce
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Encuentra los mejores productos al mejor precio. 
              Compra de forma fácil y segura.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/shop/productos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver Productos
              </Link>
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-blue-600 text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Amplio Catálogo
              </h3>
              <p className="text-gray-600">
                Encuentra una gran variedad de productos para todos los gustos
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-blue-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Envío Rápido
              </h3>
              <p className="text-gray-600">
                Recibe tus pedidos en tiempo récord con nuestro servicio express
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-blue-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compra Segura
              </h3>
              <p className="text-gray-600">
                Tu información está protegida con los más altos estándares de seguridad
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
