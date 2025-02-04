import { useAuthStore } from "../store/useAuthStore"


const HomePage = () => {
const {authUser} = useAuthStore()
  return (
    <div className="h-screen bg-base-200">
        HomePage


    </div>
  )
}

export default HomePage