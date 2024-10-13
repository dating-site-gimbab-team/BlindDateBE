import RandomRecommendedCard from "@/components/ui/card/random_recommended_card";

const RecommendedSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">이런 분을 찾고 있나요?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <RandomRecommendedCard
            key={index}
            name="이쁜이"
            age="나이"
            imageUrl="/logo.png"
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;