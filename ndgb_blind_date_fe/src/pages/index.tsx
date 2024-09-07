import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Google OAuth2 로그인 엔드포인트로 리다이렉트
    window.location.href = 'http://localhost:1323/login'; // 백엔드의 Google OAuth 로그인 엔드포인트
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-10 w-auto">

        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleGoogleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;