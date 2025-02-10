import AddTransactionUI from "../components/dashboard/AddTransactionUI"



const DashboardPage = () => {

  return (
    <div className=" grid w-full transition-all duration-800 ease-in-out border-b border-base-300">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full  md:w-[600px] space-y-8 flex justify-center items-center">
     <AddTransactionUI/>
        </div>
        </div>
    </div>
  )
}

export default DashboardPage