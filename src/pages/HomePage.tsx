import SignInButton from "../components/button/SignInButton"
import { useAuthStore } from "../store/useAuthStore"


const HomePage = () => {
const {authUser} = useAuthStore()
console.log('authUser',authUser);
  return (
    <div className="h-screen bg-base-200">
        HomePage

      <SignInButton/>
    </div>
  )
}

export default HomePage