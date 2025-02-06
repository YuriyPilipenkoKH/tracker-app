import { useAuthStore } from "../store/useAuthStore";


const DashboardPage = () => {
  const {authUser} = useAuthStore()
  console.log('authUser',authUser);
  return (

    <div className=" grid transition-all duration-800 ease-in-out">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8">
     DashboardPage

        </div>
        </div>
    </div>
  )
}

export default DashboardPage