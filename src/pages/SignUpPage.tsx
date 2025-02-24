import { SignUpForm } from "../components/forms/SignUpForm"
import { Link } from "react-router-dom"


const SignUpPage = () => {
  return (
    <div className="grid transition-all ease-in-out  duration-800">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-center text-lg font-bold">Create Account</h2>
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