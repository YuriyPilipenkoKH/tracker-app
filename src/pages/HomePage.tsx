
import { useAuthStore } from "../store/useAuthStore"


const HomePage = () => {
const {authUser} = useAuthStore()
console.log('authUser',authUser);
  return (
    <div className=" grid ">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8">
        HomePage

        </div>
        </div>
    </div>
  )
}

export default HomePage