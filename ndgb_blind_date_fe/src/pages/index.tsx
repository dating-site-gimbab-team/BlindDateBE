import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://your-server-domain.com/api/auth/status', {
          credentials: 'include',
        });

        if (response.ok) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-xl">Redirecting...</p>
    </div>
  );
};

export default HomePage;