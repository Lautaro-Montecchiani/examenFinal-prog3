import api from "./client";

export interface Product {
  id_key: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
}

export const listProducts = (skip = 0, limit = 20) =>
  api.get<Product[]>(`/products`, { params: { skip, limit } }).then((r) => r.data);

export const getProduct = (id: number) => api.get<Product>(`/products/${id}`).then((r) => r.data);

export const createProduct = (payload: Omit<Product, "id_key">) =>
  api.post<Product>("/products", payload).then((r) => r.data);

export const updateProduct = (id: number, payload: Partial<Omit<Product, "id_key">>) =>
  api.put<Product>(`/products/${id}`, payload).then((r) => r.data);

export const deleteProduct = (id: number) => api.delete<void>(`/products/${id}`).then((r) => r.data);
