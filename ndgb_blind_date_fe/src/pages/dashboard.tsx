// pages/dashboard.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지 또는 쿠키에서 JWT 토큰 가져오기
    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

    if (token) {
      setAuthenticated(true);
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push('/login');
    }
  }, [router]);

  if (!authenticated) {
    return null; // 인증 중일 때 빈 화면을 보여줌
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </div>
  );
}