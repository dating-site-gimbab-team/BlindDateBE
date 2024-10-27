import { useRouter } from "next/router";
import TopNavBar from "@/components/common/top_nav_bar";
import RecommendedSection from "@/components/ui/section/recommended_section";
import PostCardSection from "@/components/ui/section/post_card_section";
import useAuth from "@/hooks/auth/use_auth";

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
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 네비게이션 바 */}
      <TopNavBar user={user} handleLogin={handleLogin} />{" "}
      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto px-4 py-12">
        <RecommendedSection /> {/* 추천 섹션 사용 */}
        <PostCardSection /> {/* 커뮤니티 섹션 사용 */}
      </main>
    </div>
  );
}
