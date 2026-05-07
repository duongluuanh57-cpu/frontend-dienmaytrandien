import { useState } from "react";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    brand?: string;
    type?: string;
    desc: string;
    soldCount?: number;
  };
}

const getTranslatedProductName = (name: string, lang: "vi" | "en") => {
  if (lang === "vi") return name;
  return name
    .replace("Máy bơm nước ngưng điều hòa", "Condensate Pump")
    .replace("Máy bơm nước ngưng", "Condensate Pump")
    .replace("Quạt chắn gió", "Air Curtain")
    .replace("Máy lạnh di động", "Portable AC")
    .replace("Máy lạnh", "Air Conditioner")
    .replace("Hệ thống Multi", "Multi System")
    .replace("Treo tường", "Wall Mounted")
    .replace("Tủ đứng", "Floor Standing")
    .replace("Âm trần", "Cassette")
    .replace("Premium", "Premium");
};

const getTranslatedProductDesc = (desc: string, lang: "vi" | "en") => {
  if (lang === "vi") return desc;
  switch (desc) {
    case "Độ cao đẩy tối đa 3 mét, hoạt động siêu êm.":
      return "Max head 3 meters, ultra-quiet operation.";
    case "Dành cho máy lạnh treo tường dưới 2HP.":
      return "For wall-mounted ACs under 2HP.";
    case "Công suất lớn, đẩy cao tối đa 6 mét.":
      return "High capacity, max head 6 meters.";
    case "Thiết kế siêu nhỏ gọn, giấu trong dàn lạnh.":
      return "Ultra-compact design, hidden in the indoor unit.";
    case "Đẩy cao tối đa 3 mét.":
      return "Max head 3 meters.";
    case "Phù hợp cho các dòng máy lạnh tủ đứng.":
      return "Suitable for floor-standing ACs.";
    case "Dòng cao cấp, độ bền vượt trội.":
      return "Premium series, outstanding durability.";
    case "Dòng Pro chuyên dụng cho máy lạnh treo tường.":
      return "Pro series specialized for wall-mounted ACs.";
    case "Thiết kế mới, giảm tiếng ồn tối đa.":
      return "New design, maximum noise reduction.";
    case "Phiên bản Ultra với độ bền cực cao.":
      return "Ultra version with extremely high durability.";
    case "Chuyên dùng cho các dòng máy lạnh âm trần.":
      return "Specialized for cassette ACs.";
    case "Độ dài 0.9m, thổi xa 3.5m.":
      return "Length 0.9m, air flow 3.5m.";
    case "Công nghệ mới, siêu êm.":
      return "New technology, ultra-quiet.";
    case "Độ dài 1.2m, phù hợp cửa trung bình.":
      return "Length 1.2m, suitable for medium doors.";
    case "Độ bền cao, hoạt động ổn định.":
      return "High durability, stable operation.";
    case "Độ dài 1.5m, thổi mạnh mẽ.":
      return "Length 1.5m, powerful airflow.";
    case "Tiết kiệm điện năng.":
      return "Energy-saving.";
    case "Dòng công nghiệp, thổi cực mạnh.":
      return "Industrial series, powerful airflow.";
    case "Dành cho sảnh lớn, trung tâm thương mại.":
      return "For large lobbies, shopping malls.";
    case "Công suất 12000BTU, làm lạnh nhanh.":
      return "Capacity 12000BTU, fast cooling.";
    case "Công nghệ Inverter tiết kiệm điện.":
      return "Inverter technology, energy-saving.";
    case "Công suất 9000BTU, nhỏ gọn.":
      return "Capacity 9000BTU, compact.";
    case "Lọc không khí Nanoe-G cực sạch.":
      return "Nanoe-G air filter, ultra-clean.";
    case "Công suất lớn 18000BTU cho phòng rộng.":
      return "High capacity 18000BTU for large rooms.";
    case "Làm lạnh tản nhiệt cánh kép siêu nhanh.":
      return "Double flap heat dissipation, super-fast cooling.";
    case "Dòng cao cấp, bền bỉ.":
      return "Premium series, highly durable.";
    case "Thiết kế sang trọng, tích hợp Wifi.":
      return "Luxurious design, integrated Wifi.";
    case "Thiết kế hiện đại, làm lạnh nhanh.":
      return "Modern design, fast cooling.";
    case "Công suất lớn, phù hợp phòng khách.":
      return "High capacity, suitable for living rooms.";
    case "Thẩm mỹ cao, thổi gió 360 độ.":
      return "High aesthetics, 360-degree airflow.";
    case "Siêu tiết kiệm điện.":
      return "Super energy-saving.";
    case "Dòng công nghiệp cho hội trường.":
      return "Industrial series for conference halls.";
    case "Làm lạnh diện tích rộng.":
      return "Cooling for large areas.";
    case "Bền bỉ với thời gian.":
      return "Durable over time.";
    case "Hệ thống đa kết nối tiện lợi.":
      return "Convenient multi-connection system.";
    case "Làm lạnh nhanh, tiết kiệm điện vượt trội.":
      return "Fast cooling, outstanding energy saving.";
    case "Dòng cao cấp Nanoe-X lọc bụi mịn.":
      return "Premium Nanoe-X series, filters fine dust.";
    case "Thiết kế sang trọng, thổi gió 4 hướng.":
      return "Luxurious design, 4-way airflow.";
    case "Tiết kiệm không gian lắp đặt dàn nóng.":
      return "Saves outdoor unit installation space.";
    case "Công suất lớn cho phòng khách.":
      return "High capacity for living rooms.";
    case "Giải pháp cho không gian rộng lớn.":
      return "Solution for large spaces.";
    case "Lọc không khí suốt 24 giờ.":
      return "24-hour air filtration.";
    case "Đẳng cấp tiện nghi cho biệt thự.":
      return "Luxurious comfort for villas.";
    default:
      return desc;
  }
};

const getTranslatedType = (type: string, lang: "vi" | "en") => {
  if (lang === "vi") return type;
  switch (type) {
    case "Treo tường": return "Wall Mounted";
    case "Tủ đứng": return "Floor Standing";
    case "Âm trần": return "Cassette";
    case "Hệ thống Multi": return "Multi System";
    default: return type;
  }
};

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { lang } = useLanguageStore();

  const displayName = getTranslatedProductName(product.name, lang);
  const displayDesc = getTranslatedProductDesc(product.desc, lang);
  const displayType = product.type ? getTranslatedType(product.type, lang) : "Hot";

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col h-full relative"
    >
      {/* Top Overlay: Badge & Favorite */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        {/* Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            {displayType}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors active:scale-90 group/fav"
        >
          <Heart 
            className={`h-3.5 w-3.5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-400 group-hover/fav:text-red-500"}`} 
          />
        </button>

        <Image
          src={product.image}
          alt={displayName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Quick Add Button - Slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button className="w-full bg-white/95 backdrop-blur-sm text-slate-900 font-bold py-2.5 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95 text-xs uppercase tracking-wider">
            <ShoppingCart className="h-4 w-4" />
            <span>{lang === "vi" ? "Thêm vào giỏ" : "Add to Cart"}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Tên hãng */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          {product.brand || "Trần Điền"}
        </p>

        {/* Tên sản phẩm */}
        <h3 className="text-sm md:text-base font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed mb-1 min-h-[2.5rem]" title={displayName}>
          {displayName}
        </h3>

        {/* Mô tả sản phẩm */}
        <p className="text-xs text-slate-500 line-clamp-2 min-h-[2rem] leading-relaxed mb-3">
          {displayDesc}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          {/* Giá */}
          <div className="flex items-center justify-between">
            <span className="text-primary font-black text-base tracking-tight">
              {product.price}
            </span>
          </div>

          {/* Lượt mua */}
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="w-px h-3 bg-slate-200" />
            <span>{lang === "vi" ? `Đã bán ${product.soldCount || ((product.id * 7) % 50 + 15)}` : `Sold ${product.soldCount || ((product.id * 7) % 50 + 15)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
