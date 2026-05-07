import React from 'react';
import type { Product } from '@/schemas/product';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Điện Máy Trần Điền",
    "url": "http://dienmaytrandien.vn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "http://dienmaytrandien.vn/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return <JsonLd data={schema} />;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Điện Máy Trần Điền",
    "alternateName": "Công ty TNHH TMDV KT Trần Điền",
    "url": "http://dienmaytrandien.vn",
    "logo": "https://i.ibb.co/k7YP1wc/logo-122x122.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-903-76-00-96",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61555879134958"
    ]
  };
  return <JsonLd data={schema} />;
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Điện Máy Trần Điền",
    "image": "https://i.ibb.co/k7YP1wc/logo-122x122.png",
    "@id": "http://dienmaytrandien.vn",
    "url": "http://dienmaytrandien.vn",
    "telephone": "+84-903-76-00-96",
    "email": "dienmaytrandien@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22 Đoàn Hữu Trưng, P.An Khánh",
      "addressLocality": "Thủ Đức, TP. Hồ Chí Minh",
      "postalCode": "700000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.8231,
      "longitude": 106.6297
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "07:00",
      "closes": "22:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "86"
    }
  };
  return <JsonLd data={schema} />;
}

export function ProductSchema({ products }: { products: Product[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description || `Sản phẩm ${product.name} chính hãng tại Điện Máy Trần Điền`,
        "brand": {
          "@type": "Brand",
          "name": product.brand || "Trần Điền"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "VND",
          "price": product.price?.replace(/\D/g, "") || "0",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Điện Máy Trần Điền"
          }
        }
      }
    }))
  };
  return <JsonLd data={schema} />;
}

export function ImageGallerySchema({ images }: { images: { src: string; title: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Công trình tiêu biểu - Điện Máy Trần Điền",
    "description": "Các dự án lắp đặt điều hòa và điện máy tiêu biểu đã hoàn thành tại TP.HCM",
    "associatedMedia": images.map((img) => ({
      "@type": "ImageObject",
      "contentUrl": img.src,
      "name": img.title,
      "description": img.title,
      "author": {
        "@type": "Organization",
        "name": "Điện Máy Trần Điền"
      }
    }))
  };
  return <JsonLd data={schema} />;
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Máy bơm nước ngưng điều hòa là gì?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Máy bơm nước ngưng điều hòa là thiết bị dùng để bơm nước ngưng tụ từ dàn lạnh của máy điều hòa ra ngoài, được dùng khi không thể thoát nước theo trọng lực. Các dòng phổ biến gồm Kingpump, HI-TECH HRP với độ cao đẩy từ 3m đến 15m."
        }
      },
      {
        "@type": "Question",
        "name": "Điện Máy Trần Điền có lắp đặt điều hòa tại nhà không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Có. Điện Máy Trần Điền cung cấp dịch vụ tư vấn, bán và lắp đặt điều hòa Nagakawa, Panasonic chính hãng tại TP.HCM. Liên hệ 0903 76 00 96 để được báo giá miễn phí."
        }
      },
      {
        "@type": "Question",
        "name": "Quạt chắn gió (air curtain) dùng để làm gì?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quạt chắn gió tạo màn khí vô hình ngăn bụi, côn trùng và khí nóng bên ngoài tràn vào bên trong cửa hàng, nhà xưởng. Giúp tiết kiệm điện năng cho máy lạnh và duy trì nhiệt độ ổn định."
        }
      },
      {
        "@type": "Question",
        "name": "Máy lạnh di động có ưu điểm gì so với máy lạnh cố định?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Máy lạnh di động không cần lắp đặt cố định, dễ dàng di chuyển giữa các phòng, không cần đục tường hay lắp dàn nóng bên ngoài. Phù hợp cho văn phòng, phòng trọ hoặc không gian tạm thời."
        }
      }
    ]
  };
  return <JsonLd data={schema} />;
}

export function AboutPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Giới thiệu về Điện Máy Trần Điền",
    "description": "Lịch sử hình thành, sứ mệnh và tầm nhìn của công ty TNHH TMDV KT Trần Điền. Hơn 9 năm kinh nghiệm cung cấp giải pháp điện máy gia đình và công nghiệp tại Việt Nam.",
    "url": "http://dienmaytrandien.vn/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Điện Máy Trần Điền",
      "foundingDate": "2016",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ho Chi Minh City",
        "addressCountry": "VN"
      }
    }
  };
  return <JsonLd data={schema} />;
}
