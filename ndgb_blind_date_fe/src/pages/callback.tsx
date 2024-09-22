import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = () => {
      // URL의 쿼리 파라미터에서 토큰을 추출
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      console.log(token);
      if (token) {
        // JWT 토큰을 로컬 스토리지에 저장
        // localStorage.setItem('token', token);

        // 또는 JWT 토큰을 쿠키에 저장 (쿠키로 처리하고 싶은 경우)
        document.cookie = `token=${token}; path=/;`;

        // 인증된 사용자를 대시보드로 리다이렉트
        router.push('/');
      } else {
        console.error('토큰을 찾을 수 없습니다.');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">인증 중입니다...</p>
    </div>
  );
}