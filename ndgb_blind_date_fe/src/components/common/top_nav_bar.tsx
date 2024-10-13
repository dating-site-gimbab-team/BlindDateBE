import React from "react";
import Image from "next/image";

const TopNavBar: React.FC<{ user: any; handleLogin: () => void }> = ({ user, handleLogin }) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png" // 로고 이미지 경로
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
  );
};

export default TopNavBar;
