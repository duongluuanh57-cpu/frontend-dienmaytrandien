"use client";

import { MapPin, FileText, Phone, MessageCircle, Mail, Share2, Send as SendIcon } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";

export function CompanyDetails() {
  const { lang } = useLanguageStore();

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, label: lang === "vi" ? "Địa chỉ" : "Address", value: "22 Đoàn Hữu Trưng, P.An Khánh, Tp. Hồ Chí Minh" },
    { icon: <FileText className="w-5 h-5" />, label: lang === "vi" ? "Mã số thuế" : "Tax Code", value: "0319085664" },
    { icon: <Phone className="w-5 h-5" />, label: lang === "vi" ? "Điện thoại" : "Phone", value: "0903 76 00 96 – 0922 578 679" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Zalo", value: "0903 035 234" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "dienmaytrandien@gmail.com" },
  ];

  const brands = [
    "Daikin", "Panasonic", "LG", "Samsung", "Toshiba", 
    "Mitsubishi Electric", "Reetech", "Nagakawa", "Kingpump", "Nedfon"
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 bg-white rounded-[32px] border border-slate-100 shadow-sm mb-4 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Introduction */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
            {lang === "vi" ? (
              <>CÔNG TY TNHH TMDV KT <span className="text-primary uppercase">TRẦN ĐIỀN</span></>
            ) : (
              <>TRAN DIEN <span className="text-primary uppercase">MEP CO., LTD</span></>
            )}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              {lang === "vi" ? (
                "Là một trong những đơn vị có uy tín có nhiều năm kinh nghiệm trong lĩnh vực điện máy. Chúng tôi chuyên cung cấp các dịch vụ lắp đặt, sửa chữa và mua bán điện máy và các phụ kiện chất lượng cao, chính hãng với mức cả hợp lý phù hợp với nhu cầu tiêu dùng của gia đình Việt Nam. Với đội ngũ kỹ thuật viên giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi luôn đáp ứng nhu cầu của khách hàng một cách nhanh chóng nhất."
              ) : (
                "Is one of the prestigious units with many years of experience in the electrical and refrigeration field. We specialize in providing high-quality, genuine installation, repair, and trade services of electrical equipment and accessories at reasonable prices suitable for the consumption needs of Vietnamese families. With a team of highly experienced technicians and modern equipment, we always meet our customers' demands in the fastest manner."
              )}
            </p>
            <p>
              {lang === "vi" ? (
                <>
                  <span className="font-bold text-slate-800">Trần Điền</span> luôn mang lại cho khách hàng những sản phẩm và dịch vụ tốt nhất, tiết kiệm năng lượng và thân thiện với môi trường. Sản phẩm của chúng tôi đến từ các thương hiệu nổi tiếng thế giới.
                </>
              ) : (
                <>
                  <span className="font-bold text-slate-800">Tran Dien</span> always brings customers the best products and services, which are energy-saving and environmentally friendly. Our products come from world-renowned brands.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Brands Tags */}
        <div className="mb-12">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            {lang === "vi" ? "Thương hiệu đồng hành" : "Partner Brands"}
          </p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <span key={brand} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-bold border border-slate-100 hover:border-primary/30 hover:bg-white hover:text-primary transition-all cursor-default">
                {brand}
              </span>
            ))}
            <span className="px-4 py-2 bg-slate-50 text-slate-400 rounded-full text-sm font-bold border border-slate-100 italic">
              {lang === "vi" ? "và nhiều thương hiệu khác..." : "and many other brands..."}
            </span>
          </div>
        </div>

        {/* Closing Statement */}
        <p className="text-slate-700 font-bold mb-12 border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-xl italic">
          {lang === "vi" 
            ? "Trần Điền chuyên cung cấp, lắp đặt sửa chữa máy lạnh trong nội ngoại thành phố, luôn xuất hiện khi khách hàng cần."
            : "Tran Dien specializes in providing, installing, and repairing air conditioners both inside and outside the city, always appearing when customers need."}
        </p>

        {/* Contact Details Card */}
        <div className="bg-slate-50 rounded-[24px] p-8 md:p-10 border border-slate-100">
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="w-8 h-px bg-primary/30" /> {lang === "vi" ? "Chi tiết liên hệ" : "Contact Details"}
          </p>
          
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900 leading-tight uppercase mb-4">
              {lang === "vi" 
                ? "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KỸ THUẬT TRẦN ĐIỀN" 
                : "TRAN DIEN TECHNICAL SERVICE TRADING COMPANY LIMITED"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 shrink-0 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-slate-700 leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Share Section (Mockup based on image) */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">{lang === "vi" ? "Chia sẻ:" : "Share:"}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 bg-[#1877F2] text-white rounded-md flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-xs"
                  aria-label="Chia sẻ lên Facebook"
                >
                  F
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 bg-[#1DA1F2] text-white rounded-md flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-xs"
                  aria-label="Chia sẻ lên Twitter"
                >
                  X
                </button>
                <button 
                  onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-8 h-8 bg-[#24A1DE] text-white rounded-md flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Chia sẻ lên Telegram"
                >
                  <SendIcon className="w-4 h-4 fill-white" />
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Điện Máy Trần Điền',
                        url: window.location.href
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(lang === "vi" ? "Đã sao chép liên kết!" : "Link copied!");
                    }
                  }}
                  className="w-8 h-8 bg-slate-300 text-slate-600 rounded-md flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Chia sẻ khác"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
