import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export interface User {
  name: string;
  profileImage: string;
}

export interface TokenPayload {
  email: string;
  exp: number;
  picture_url: string;
  user_id: number;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decoded = jwt.decode(token) as TokenPayload;
          setUser({
            name: decoded.email as string,
            profileImage: decoded.picture_url as string,
          });
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };
    verifyToken();
  }, []);

  return { user, setUser };
};

export default useAuth;