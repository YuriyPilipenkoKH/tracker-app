import { Link } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'
import { useEffect } from 'react';
  

const LoginPage = () => {
      useEffect(() => {
        console.log("LoginPage mounted");

        return () => console.log("LoginPage unmounted");
      }, []);
  return (
    <div className=" grid transition-all duration-800 ease-in-out">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8">

      <LoginForm />
      <div className="text-center">
          <p className="text-base-content/60">
            Need an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>


  </div>
  )
}

export default LoginPage