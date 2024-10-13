import Image from "next/image";

interface UserCardProps {
  name: string;
  age: string;
  imageUrl: string;
}

const RandomRecommendedCard: React.FC<UserCardProps> = ({name, age, imageUrl}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative aspect-w-1 aspect-h-1">
        <Image
          src={imageUrl} // 로고 이미지 경로
          alt="Logo"
          width={400}
          height={400}
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500 mt-1">{age}</p>
      </div>
    </div>
  )
}

export default RandomRecommendedCard