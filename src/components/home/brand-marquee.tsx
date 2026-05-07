"use client";

import Image from "next/image";

const brands = [
  { name: "Daikin", logo: "https://i.ibb.co/Y44VfrP2/brand-243x207.png" },
  { name: "Panasonic", logo: "https://i.ibb.co/qF2NbC9z/brand-1816x1536.png" },
  { name: "LG", logo: "https://i.ibb.co/ZRwrYhWZ/brand-2650-1568.png" },
  { name: "Samsung", logo: "https://i.ibb.co/yFYZL09T/brand-3226x1280.png" },
  { name: "Toshiba", logo: "https://i.ibb.co/jvk5mCQy/brand-3310x1280.png" },
  { name: "Sharp", logo: "https://i.ibb.co/0pLNjjCq/brand-3896-1056.png" },
  { name: "Mitsubishi", logo: "https://i.ibb.co/rRLwQJc9/brand-4167x4167.png" },
];

export function BrandMarquee() {
  // Nhân đôi mảng để tạo hiệu ứng cuộn vô tận mượt mà
  const doubleBrands = [...brands, ...brands];

  return (
    <section className="w-full py-4 bg-white border-y border-slate-100 overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .group:hover .animate-scroll {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="flex animate-scroll whitespace-nowrap">
          {doubleBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`}
              className="flex items-center justify-center px-8 md:px-12"
            >
              <div className="relative h-8 md:h-12 w-32 md:w-40 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
