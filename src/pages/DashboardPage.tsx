import AddTransactionUI from "../components/dashboard/AddTransactionUI"



const DashboardPage = () => {

  return (
    <div className=" grid transition-all duration-800 ease-in-out">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8 flex justify-center items-center">
     <AddTransactionUI/>
        </div>
        </div>
    </div>
  )
}

export default DashboardPage