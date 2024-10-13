import PostCard from "../card/post_card";

const PostCardSection: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">커뮤니티 인기글</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <PostCard
            key={index}
            username="사용자 이름"
            postTime="게시 시간"
            title="게시글 제목"
            preview="게시글 내용 미리보기..."
            likes={0}
            comments={0}
          />
        ))}
      </div>
    </section>
  );
};

export default PostCardSection;