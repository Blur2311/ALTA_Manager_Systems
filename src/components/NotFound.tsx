// src/layout/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="mt-14 text-center">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/home">Quay lại trang chính</Link>
    </div>
  );
};
