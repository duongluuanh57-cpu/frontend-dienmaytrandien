import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductsContent } from "./products-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm chính hãng | Điện Máy Trần Điền",
  description: "Cung cấp máy bơm nước ngưng Kingpump, Hi-tech, quạt chắn gió Nanyoo, quạt lạnh Oulai, điều hòa không khí Nagakawa, Panasonic chính hãng, uy tín hàng đầu TP.HCM.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-background overflow-x-hidden min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <ProductsContent />
      </main>

      <Footer />
    </div>
  );
}
