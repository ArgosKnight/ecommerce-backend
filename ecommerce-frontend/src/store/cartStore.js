import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Agregar producto al carrito
      addItem: (producto, cantidad = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.producto.id === producto.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.producto.id === producto.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            ),
          });
        } else {
          set({ items: [...items, { producto, cantidad }] });
        }
      },

      // Actualizar cantidad
      updateQuantity: (productoId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(productoId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.producto.id === productoId ? { ...item, cantidad } : item
          ),
        });
      },

      // Eliminar producto
      removeItem: (productoId) => {
        set({
          items: get().items.filter(item => item.producto.id !== productoId),
        });
      },

      // Vaciar carrito
      clearCart: () => {
        set({ items: [] });
      },

      // Calcular total
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.producto.precio * item.cantidad,
          0
        );
      },

      // Contar items
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.cantidad, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
