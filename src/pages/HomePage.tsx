
import { useAuthStore } from "../store/useAuthStore"


const HomePage = () => {
const {authUser} = useAuthStore()
console.log('authUser',authUser);
  return (
    <div className="h-screen bg-base-200">
        HomePage


    </div>
  )
}

export default HomePage