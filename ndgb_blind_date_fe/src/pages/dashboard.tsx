import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // 서버에서 사용자 인증 상태를 확인하는 API를 호출합니다.
        const response = await fetch('https://your-server-domain.com/api/auth/status', {
          credentials: 'include', // 쿠키나 인증 정보를 포함하여 요청
        });

        if (!response.ok) {
          // 인증되지 않은 경우 로그인 페이지로 리디렉션
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        router.push('/login'); // 오류 발생 시 로그인 페이지로 리디렉션
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
    </div>
  );
};

export default DashboardPage;