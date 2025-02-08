import AddTransactionForm from "../components/forms/AddTransactionForm"


const DashboardPage = () => {

  return (
    <div className=" grid transition-all duration-800 ease-in-out">
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full max-w-md space-y-8">
     <AddTransactionForm/>
        </div>
        </div>
    </div>
  )
}

export default DashboardPage