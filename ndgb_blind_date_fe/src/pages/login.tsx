import GoogleLoginButton from "@/components/ui/GoogleLoginButton";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to Your Account
        </h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;