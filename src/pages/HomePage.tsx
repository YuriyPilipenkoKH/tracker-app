
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"


const HomePage = () => {
const {authUser} = useAuthStore()
useEffect(() => {
  console.log("HomePage mounted");
  console.log('authUser',authUser);

        return () => console.log("HomePage unmounted");
      }, []);
  return (
    <div className=" grid transition-all duration-800 ease-in-out">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8">
        HomePage

        </div>
        </div>
    </div>
  )
}

export default HomePage