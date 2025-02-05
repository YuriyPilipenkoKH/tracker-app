import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // useEffect(() => {
  //   const handleAuth = async () => {
  //     try {
  //       await checkAuth(); // Refresh auth state
  //       toast.success("Login successful!");
  //       navigate("/"); // Redirect to homepage
  //     } catch (error) {
  //       toast.error("Authentication failed");
  //       navigate("/"); // Redirect to homepage or login page
  //     }
  //   };

  //   handleAuth();
  // }, [navigate, checkAuth]);

  return <div>Loading...</div>; // Show a loading indicator
};

export default AuthCallbackPage;
