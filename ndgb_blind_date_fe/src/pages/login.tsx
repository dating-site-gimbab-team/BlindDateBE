import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Google OAuth2 로그인 엔드포인트로 리다이렉트
    window.location.href = 'http://localhost:1323/login'; // 백엔드의 Google OAuth 로그인 엔드포인트
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            className="mx-auto"
            src="/logo.png" // 로고 이미지 경로
            alt="Logo"
            width={168}
            height={400}
            layout="fixed" // 레이아웃 속성 추가
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            소셜 데이팅 서비스
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGoogleLogin}
            >
              구글 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;