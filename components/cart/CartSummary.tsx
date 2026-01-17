'use client';

interface CartSummaryProps {
  total: number;
  onClearCart: () => void;
}

export const CartSummary = ({ total, onClearCart }: CartSummaryProps) => {
  return (
    <div className="h-fit rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Resumen
      </h2>

      <div className="space-y-3 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>{total.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Envío</span>
          <span>Gratis</span>
        </div>
      </div>

      <div className="my-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
        <span>Total</span>
        <span>{total.toFixed(2)}€</span>
      </div>

      <button className="mb-3 w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
        Proceder al pago
      </button>

      <button
        onClick={onClearCart}
        className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
      >
        Vaciar carrito
      </button>
    </div>
  );
};
