"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Biến này sẽ bị reset về false mỗi khi người dùng ấn F5 hoặc mở tab mới.
// Nhưng nó sẽ giữ nguyên là true nếu họ chuyển trang bằng các link trong website (Soft Navigation).
let isAppInitialized = false;

export function RequireHome() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAppInitialized) {
      isAppInitialized = true;
      // Nếu không phải trang chủ, ép chuyển hướng về trang chủ
      if (pathname !== "/") {
        router.replace("/");
      }
    }
  }, [pathname, router]);

  return null;
}
