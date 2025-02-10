import AddTransactionUI from "../components/dashboard/AddTransactionUI"
import BalanceUI from "../components/dashboard/BalanceUI"
import TransactionList from "../components/dashboard/TransactionList"



const DashboardPage = () => {

  return (
    <div className=" grid w-full transition-all duration-800 ease-in-out ">
    <div className="flex flex-col justify-center items-center ">
      {/* <div className="w-full  md:w-[600px] space-y-8 flex flex-col justify-center items-center"> */}
     <BalanceUI/>
     <AddTransactionUI/>
     <TransactionList/>
        {/* </div> */}
        </div>
    </div>
  )
}

export default DashboardPage