import { useRouter } from "next/router";
import TopNavBar from "../components/common/top_nav_bar"; // TopNavBar 컴포넌트 임포트
import RecommendedSection from "@/components/ui/section/recommended_section";
import PostCardSection from "@/components/ui/section/post_card_section";
import useAuth from "@/hooks/auth/use_auth";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useAuth(); // 커스텀 훅 사용

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      {/* 상단 네브바 컴포넌트 사용 */}
      <TopNavBar user={user} handleLogin={handleLogin} />{" "}
      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto px-4 py-12">
        <RecommendedSection /> {/* 추천 상품 섹션 사용 */}
        <PostCardSection /> {/* 커뮤니티 섹션 사용 */}
      </main>
    </>
  );
};

export default IndexPage;
