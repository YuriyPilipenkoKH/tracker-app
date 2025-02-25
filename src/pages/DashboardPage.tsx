import AddTransactionUI from "../components/dashboard/AddTransactionUI"
import BalanceUI from "../components/dashboard/BalanceUI"
import TransactionList from "../components/dashboard/TransactionList"


const DashboardPage = () => {
  return (
    <div className="grid  transition-all ease-in-out lg:grid-cols-2 duration-800 px-4">
    <div className="flex flex-col items-center gap-2 justify-top ">
     <BalanceUI/>
     <AddTransactionUI/>

        </div>
     <TransactionList/>
    </div>
  )
}

export default DashboardPage