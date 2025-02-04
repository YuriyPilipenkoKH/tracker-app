import { useAuthStore } from "../../store/useAuthStore"
// interface SignInButtonProps {
//   provider: "google" | "github"
// }

const SignInButton = (
  // {provider}:SignInButtonProps
) => {
 const {handleGoogleLogin} = useAuthStore()
return(
  <button className='flex w-full justify-center border rounded-lg p-2 space-x-2 items-center'
  onClick={handleGoogleLogin}>
    Google
  </button>
)
}
export default SignInButton