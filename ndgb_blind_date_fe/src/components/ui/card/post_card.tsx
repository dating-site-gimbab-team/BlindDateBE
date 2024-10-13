interface PostCardProps {
  username: string;
  postTime: string;
  title: string;
  preview: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<PostCardProps> = ({ username, postTime, title, preview, likes, comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500">{postTime}</p>
        </div>
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{preview}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>좋아요 {likes}</span>
        <span>댓글 {comments}</span>
      </div>
    </div>
  );
};

export default PostCard;