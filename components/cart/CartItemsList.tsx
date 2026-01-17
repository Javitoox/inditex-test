'use client';

import { CartItem, type CartItemData } from '@/ui/CartItem';

interface CartItemsListProps {
  items: CartItemData[];
  onRemoveItem: (itemId: string) => void;
}

export const CartItemsList = ({ items, onRemoveItem }: CartItemsListProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item._id} item={item} onRemove={onRemoveItem} />
        ))}
      </div>
    </div>
  );
};
