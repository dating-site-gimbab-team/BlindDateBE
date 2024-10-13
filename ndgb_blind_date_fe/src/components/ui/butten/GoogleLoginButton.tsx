import React from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    // 서버에 정의된 OAuth 로그인 엔드포인트로 이동합니다.
    window.location.href = 'http://localhost:1323/login';
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;