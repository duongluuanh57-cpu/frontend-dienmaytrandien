export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-dienmaytrandien.onrender.com";

export interface BackendProduct {
  id: number;
  name: string;
  slug: string;
  code: string;
  origin: string;
  shortDescription: string;
  description: string;
  price: number;
  brand: string;
  type: string;
  categoryId: number;
  brandId: number;
  image: string;
  images: string[];
  isAvailable: boolean;
  stock: number;
  views: number;
  specs: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface BackendCategory {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  createdAt: string;
}

export interface BackendBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: string;
  createdAt: string;
}

export interface FetchProductsParams {
  categoryId?: number;
  brandId?: number;
  type?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: BackendProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params.categoryId) query.append("categoryId", params.categoryId.toString());
  if (params.brandId) query.append("brandId", params.brandId.toString());
  if (params.type) query.append("type", params.type);
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.sort) query.append("sort", params.sort);

  const url = `${API_BASE_URL}/api/products?${query.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCategories(): Promise<{ success: boolean; data: BackendCategory[] }> {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchBrands(): Promise<{ success: boolean; data: BackendBrand[] }> {
  const response = await fetch(`${API_BASE_URL}/api/brands`);
  if (!response.ok) {
    throw new Error(`Failed to fetch brands: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchProductBySlug(slug: string): Promise<{ success: boolean; data: BackendProduct }> {
  const response = await fetch(`${API_BASE_URL}/api/products/slug/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product by slug: ${response.statusText}`);
  }
  return response.json();
}

export function mapBackendProductToFrontend(prod: BackendProduct) {
  return {
    id: prod.id,
    name: prod.name,
    price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(prod.price),
    priceValue: prod.price,
    image: prod.image,
    brand: prod.brand,
    type: prod.type,
    desc: prod.shortDescription || prod.description || "",
    soldCount: ((prod.id * 7) % 50 + 15), // fallback if soldCount isn't inside backend schema
  };
}
