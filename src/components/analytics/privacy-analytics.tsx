"use client";

import React from 'react';

export function PrivacyAnalytics() {
  // Đây là snippet cho Plausible hoặc Umami - phân tích không cookie, an toàn và nhẹ.
  // Bạn có thể thay thế 'yourdomain.com' bằng domain thực tế khi deploy.
  return (
    <>
      {/* 
        <script 
          defer 
          data-domain="dienmaytrandien.com" 
          src="https://plausible.io/js/script.js">
        </script> 
      */}
      {/* Placeholder cho Analytics - giúp bạn nắm bắt insight mà không làm chậm trang tĩnh */}
      <meta name="analytics-platform" content="privacy-first-ready" />
    </>
  );
}
