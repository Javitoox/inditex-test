export interface ProductColor {
  code: string;
  name: string;
}

export interface ProductStorage {
  code: string;
  capacity: number;
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  cpu: string;
  ram: string;
  os: string;
  screenResolution: string;
  battery: string;
  cameras: string;
  dimensions: string;
  weight: string;
  colors: ProductColor[];
  storages: ProductStorage[];
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
