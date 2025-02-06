import { SignUpForm } from "../components/forms/SignUpForm"
import { Link } from "react-router-dom"


const SignUpPage = () => {
  return (
    <div className=" grid transition-all duration-800 ease-in-out">
      <div className="flex flex-col justify-center items-center  ">
        <div className="w-full max-w-md space-y-8">
        <SignUpForm />
        <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignUpPage