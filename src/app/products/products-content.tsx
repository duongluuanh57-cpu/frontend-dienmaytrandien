"use client";

import { useEffect, useState } from "react";
import { Package, Search, SlidersHorizontal, X, ArrowUpDown, ChevronDown, RefreshCw, Star } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ProductCard } from "@/components/home/product-card";
import {
  fetchProducts,
  fetchCategories,
  fetchBrands,
  mapBackendProductToFrontend,
  BackendProduct,
  BackendCategory,
  BackendBrand
} from "@/lib/api";

const TRANSLATIONS = {
  vi: {
    title: "Sản phẩm",
    subtitle: "Khám phá danh mục thiết bị điện máy chính hãng với giá tốt nhất thị trường.",
    searchPlaceholder: "Tìm kiếm sản phẩm...",
    allCategories: "Tất cả danh mục",
    allBrands: "Tất cả thương hiệu",
    sortBy: "Sắp xếp theo",
    sortDefault: "Mới nhất",
    sortPriceAsc: "Giá: Thấp đến Cao",
    sortPriceDesc: "Giá: Cao đến Thấp",
    loading: "Đang tải danh sách sản phẩm...",
    noProducts: "Không tìm thấy sản phẩm phù hợp.",
    clearFilters: "Xóa bộ lọc",
    categoryLabel: "Danh mục",
    brandLabel: "Thương hiệu",
    typeLabel: "Phân loại",
    resultsCount: "Tìm thấy {count} sản phẩm",
    refresh: "Làm mới",
    all: "Tất cả",
  },
  en: {
    title: "Products",
    subtitle: "Discover our catalog of genuine electrical appliances at the best prices.",
    searchPlaceholder: "Search products...",
    allCategories: "All Categories",
    allBrands: "All Brands",
    sortBy: "Sort by",
    sortDefault: "Newest",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    loading: "Loading product catalog...",
    noProducts: "No products found matching your filters.",
    clearFilters: "Clear Filters",
    categoryLabel: "Category",
    brandLabel: "Brand",
    typeLabel: "Type",
    resultsCount: "Found {count} products",
    refresh: "Refresh",
    all: "All",
  }
};

export function ProductsContent() {
  const { lang } = useLanguageStore();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [categories, setCategories] = useState<BackendCategory[]>([]);
  const [brands, setBrands] = useState<BackendBrand[]>([]);

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    async function loadFilterData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetchCategories(),
          fetchBrands()
        ]);
        if (categoriesRes.success) setCategories(categoriesRes.data);
        if (brandsRes.success) setBrands(brandsRes.data);
      } catch (err) {
        console.error("Error loading filter options:", err);
      }
    }
    loadFilterData();
  }, []);

  // Fetch products based on category, brand, sort
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          sort: sortBy,
          limit: 100 // fetch a generous list so we can search/filter client-side too
        };
        if (selectedCategory) params.categoryId = selectedCategory;
        if (selectedBrand) params.brandId = selectedBrand;

        const res = await fetchProducts(params);
        if (res.success) {
          setProducts(res.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(lang === "vi" ? "Không thể kết nối đến máy chủ." : "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategory, selectedBrand, sortBy, lang]);

  // Client-side search filtering
  const filteredProducts = products.filter((prod) => {
    if (!searchQuery.trim()) return true;
    const nameMatch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
    const brandMatch = prod.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = prod.type?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || brandMatch || typeMatch;
  });

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchQuery("");
    setSortBy("-createdAt");
  };

  return (
    <div className="container mx-auto px-4 md:px-[50px] py-10 max-w-none">
      {/* Premium Title section with modern glassmorphism effect */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-blue-950 text-white p-8 md:p-12 mb-10 shadow-2xl border border-white/10">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 text-blue-300">
            <Package className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>{lang === "vi" ? "Điện Máy Trần Điền" : "Tran Dien Appliances"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>{lang === "vi" ? "Bộ lọc tìm kiếm" : "Search Filters"}</span>
            </h2>
            {(selectedCategory || selectedBrand || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 bg-red-50 hover:bg-red-100/80 px-2 py-1 rounded-lg"
              >
                <X className="h-3 w-3" />
                <span>{t.clearFilters}</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              {lang === "vi" ? "Tìm theo từ khóa" : "Search Keyword"}
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              {t.categoryLabel}
            </label>
            <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === null
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  {lang === "vi" ? cat.name : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              {t.brandLabel}
            </label>
            <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedBrand === null
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {t.allBrands}
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBrand === brand.id
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Results */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              <p className="text-xs font-black text-slate-700 uppercase tracking-wider">
                {t.resultsCount.replace("{count}", filteredProducts.length.toString())}
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="relative inline-block text-left min-w-[180px]">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 py-2 pl-9 pr-10 rounded-xl text-xs font-bold focus:outline-none focus:border-primary cursor-pointer transition-all"
                >
                  <option value="-createdAt">{t.sortDefault}</option>
                  <option value="price">{t.sortPriceAsc}</option>
                  <option value="-price">{t.sortPriceDesc}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(selectedCategory || selectedBrand || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">
                {lang === "vi" ? "Đang lọc theo:" : "Active filters:"}
              </span>
              {selectedCategory && (
                <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors">
                  <span>
                    {categories.find((c) => c.id === selectedCategory)?.name || "Category"}
                  </span>
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors">
                  <span>{brands.find((b) => b.id === selectedBrand)?.name || "Brand"}</span>
                  <button onClick={() => setSelectedBrand(null)} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Cards Grid / Loading / Empty state */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col h-96 animate-pulse">
                  <div className="bg-slate-100 aspect-[4/3] w-full" />
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="h-3 w-1/4 bg-slate-100 rounded-md" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded-md mt-1" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded-md" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded-md mt-auto" />
                    <div className="h-4 w-1/3 bg-slate-100 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <p className="text-red-500 font-bold mb-4">{error}</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md shadow-primary/20 active:scale-95 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{t.refresh}</span>
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-100 rounded-2xl shadow-sm text-center px-4">
              <div className="p-4 rounded-full bg-slate-50 text-slate-400 mb-5">
                <Package className="h-10 w-10" />
              </div>
              <p className="text-slate-500 font-black text-sm uppercase tracking-wider mb-2">
                {t.noProducts}
              </p>
              <p className="text-slate-400 text-xs mb-6 max-w-sm leading-relaxed">
                {lang === "vi"
                  ? "Hãy thử thay đổi tiêu chí tìm kiếm hoặc xóa các bộ lọc hiện tại."
                  : "Try altering your search keywords or clearing some of the active filters."}
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all"
              >
                <X className="h-4 w-4" />
                <span>{t.clearFilters}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="h-full">
                  <ProductCard product={mapBackendProductToFrontend(prod)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
