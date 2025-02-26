import AddTransactionUI from "../components/dashboard/AddTransactionUI"
import BalanceUI from "../components/dashboard/BalanceUI"
import { BD_Wrapper } from "../components/dashboard/Dashboard.styled"
import TransactionList from "../components/dashboard/TransactionList"


const DashboardPage = () => {
  return (
    <BD_Wrapper >
    <div className="flex flex-col items-center gap-2 justify-top ">
     <BalanceUI/>
     <AddTransactionUI/>

        </div>
     <TransactionList/>
    </BD_Wrapper>
  )
}

export default DashboardPage