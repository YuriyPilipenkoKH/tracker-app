import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import UserButton from "./UserButton";
import { cn } from "../../lib/cn";
import ThemeChanger from "../button/ThemeChanger";
import Logo from "./Logo";
// import { useModalStore } from "../../store/useModalStore";


const Navbar = () => {
  // const {onModalOpen} = useModalStore()
  const {   logOut ,  token} = useAuthStore();
  const location = useLocation()
  const path = location.pathname

  return (
    <header
      className="w-full transition-all ease-in-out  duration-800" >
    <div className="h-16 px-4 mx-auto ">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="flex items-center justify-center rounded-lg size-9 bg-primary/10">
            <Logo/>
            </div>
          </Link>
          <Link to='/dashboard' 
           className={cn('btn btn-ghost ',
            (path === '/login' || path === '/signup')  && 'hidden')}
          >
            <div 
            className="text-lg font-bold max-sm:hidden" >
             {token 
             ? (path === '/' ) 
              ? 'Dashboard' 
              : (path === '/profile' ) 
                ? 'Dashboard'
                : (path === '/dashboard' ) && 'Tracker' 
             : 'Login' }
            </div>
            <div className="gap-8 MobileWrap sm:hidden">
            {token 
             ? (path === '/' ) 
              ? <MdOutlineDashboardCustomize size={25}/>
              : (path === '/profile' ) 
                ? <MdOutlineDashboardCustomize size={25}/>
                : (path === '/dashboard' ) && <FaSackDollar size={25}/>
             : <MdOutlineLogin size={25}/> }
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4 max-sm:gap-1">

       < ThemeChanger/>

          {token && (
            <div className="flex gap-4 max-sm:gap-1 ">
            <UserButton/>

              <button 
              type="button"
              className="flex justify-center px-2 btn btn-ghost" 
              onClick={logOut}
              >
                <MdOutlineLogout />
                <span className="hidden sm:inline"></span>
              </button>
            </div>
          )}
        </div>
    </div>
    </div>
  </header>
);
};


export default Navbar