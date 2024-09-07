// pages/login.tsx

import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    // 사용자가 로그인 페이지로 이동하면 자동으로 백엔드의 /login으로 리다이렉트
    window.location.href = 'http://localhost:1323/login';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">Redirecting to Google OAuth...</p>
    </div>
  );
}