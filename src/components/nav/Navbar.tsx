
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";


import UserButton from "./UserButton";
import { cn } from "../../lib/cn";
import ThemeChanger from "../button/ThemeChanger";


const Navbar = () => {
  const {   logOut ,  token} = useAuthStore();
  const location = useLocation()
  const path = location.pathname

  return (

      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="flex items-center justify-center rounded-lg size-9 bg-primary/10">
            {/* <Logo/> */}
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
              ? <MdOutlineDashboardCustomize />
              : (path === '/profile' ) 
                ? <MdOutlineDashboardCustomize />
                : (path === '/dashboard' ) && <FaSackDollar />
             : <MdOutlineLogin /> }
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

);
};


export default Navbar