import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

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

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decoded = jwt.decode(token) as TokenPayload;
          setUser({
            name: decoded.email,
            profileImage: decoded.picture_url,
          });
          setAuthenticated(true);
        } catch (error) {
          console.error("Invalid token:", error);
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };
    verifyToken();
  }, [router]);

  const handleLogin = () => {
    router.push("/login");
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 네비게이션 바 */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-500">
                커뮤니티
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-500">
                매칭
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-8">
            {user ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={user.profileImage}
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
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto px-4 py-12">
        {/* 추천 상품 섹션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">이런 분을 찾고 있나요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="relative aspect-w-1 aspect-h-1">
                  <Image
                    src="/logo.png" // 로고 이미지 경로
                    alt="Logo"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800">
                    이쁜이
                  </p>
                  <p className="text-xs text-gray-500 mt-1">나이</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 오늘의 추천 섹션 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            오늘은 이렇게 예쁘게 꾸미는 건 어때요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">user1</h3>
                  <p className="text-sm text-gray-600">시밀러</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 커뮤니티 섹션 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">커뮤니티 인기글</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="font-semibold">사용자 이름</p>
                    <p className="text-sm text-gray-500">게시 시간</p>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">게시글 제목</h3>
                <p className="text-gray-600 mb-4">게시글 내용 미리보기...</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>좋아요 0</span>
                  <span>댓글 0</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
