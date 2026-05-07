import { Package } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="p-4 rounded-full bg-red-50 text-red-600 mb-6">
        <Package className="h-12 w-12" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        Sản phẩm
      </h1>
      <p className="text-slate-500 text-lg max-w-2xl text-center leading-relaxed">
        Khám phá danh mục các thiết bị điện máy hiện đại, chính hãng với giá tốt nhất thị trường. 
        Trang sản phẩm đang được cập nhật nội dung chi tiết.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-2xl bg-slate-50 border border-slate-100 animate-pulse flex items-center justify-center text-slate-300">
            Đang tải dữ liệu...
          </div>
        ))}
      </div>
    </div>
  );
}
