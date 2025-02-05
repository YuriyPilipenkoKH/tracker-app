import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const {authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth().then(() => {

    if(authUser)  navigate("/dashboard"); // Redirect to home after login
    });
  }, [navigate, checkAuth]);

  return <div>Authenticating...</div>;
};

export default AuthCallbackPage;
