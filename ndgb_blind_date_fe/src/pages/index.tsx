import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

interface User {
  name: string;
  profileImage: string;
}
interface TokenPayload {
  email: string;
  exp: number;
  picture_url: string;
  user_id: number;
}

const HomePage: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null); // 수정된 부분

  useEffect(() => {
    const verifyToken = async () => {
    const token = Cookies.get('token');
    console.log(token)
    if (token) {
      try {
          // 비밀 키를 Uint8Array로 변환해야 합니다
          const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
              throw new Error('JWT_SECRET is not defined');
            }
            console.log(secretKey)
        
            // jwtVerify 함수는 Promise를 반환하므로 await 사용
            const decoded = jwt.decode(token) as TokenPayload;
        
            console.log('Decoded payload:', decoded);
        
            // payload에서 필요한 정보를 사용
            setUser({
              name: decoded.email as string,
              profileImage: decoded.picture_url as string,
            });
          } catch (error) {
            console.error('Invalid token:', error);
          }
      }
    }
  verifyToken();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 네비게이션 바 */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png" // 로고 이미지 경로
              alt="Logo"
              width={50}
              height={50}
            />
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-500">커뮤니티</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">쇼핑</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">인테리어/생활</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={user.profileImage} // 사용자 프로필 이미지 경로
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-gray-900 font-bold">{user.name}</p>
                </div>
              </div>
            ) : (
              <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">로그인</button>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto px-4 py-12">
        
      </main>
    </div>
  );
};

export default HomePage;