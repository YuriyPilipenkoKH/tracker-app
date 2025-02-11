import AddTransactionUI from "../components/dashboard/AddTransactionUI"
import BalanceUI from "../components/dashboard/BalanceUI"
import TransactionList from "../components/dashboard/TransactionList"



const DashboardPage = () => {

  return (
    <div className="grid min-h-screen transition-all ease-in-out lg:grid-cols-2 duration-800">
    <div className="flex flex-col items-center gap-2 justify-top ">
      {/* <div className="w-full  md:w-[600px] space-y-8 flex flex-col justify-center items-center"> */}
     <BalanceUI/>
     <AddTransactionUI/>
        {/* </div> */}
        </div>
     <TransactionList/>
    </div>
  )
}

export default DashboardPage