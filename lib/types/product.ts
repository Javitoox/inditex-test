export interface ProductColor {
  code: number | string;
  name: string;
}

export interface ProductStorage {
  code: number | string;
  name?: string;
  capacity?: number;
}

export interface ProductOptions {
  colors?: ProductColor[];
  storages?: ProductStorage[];
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
  cpu: string;
  ram: string;
  os: string;
  screenResolution: string;
  battery: string;
  cameras: string;
  dimensions: string;
  weight: string;
  options?: ProductOptions;
}

export interface CartItemDetail {
  _id: string; // ID único para cada entrada en el carrito
  id: string;
  brand: string;
  model: string;
  quantity: number;
  price: number;
  imgUrl: string;
  colorCode?: number | string;
  colorName?: string;
  storageCode?: number | string;
  storageName?: string;
}

export interface CartItem {
  productId: string;
  colorCode: string;
  storageCode: string;
  quantity: number;
}

export interface CartResponse {
  count: number;
}
