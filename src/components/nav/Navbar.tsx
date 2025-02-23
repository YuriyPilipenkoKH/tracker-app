import { LogOut, } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import ThemeChanger from "../button/ThemeChanger";
import Logo from "./Logo";
import UserButton from "./UserButton";



const Navbar = () => {
  const {   logOut , userId, token} = useAuthStore();
  const location = useLocation()
  const path = location.pathname

  return (
    <header
      className="   w-full transition-all duration-800 ease-in-out" >
    <div className="container mx-auto px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Logo/>
            </div>
          </Link>
          <Link to='/dashboard'>
            <h1 className="text-lg font-bold">
              {(path === '/' || path === '/profile') 
              ? 'Dashboard'
              :  userId ? 'Tracker' : 'Login' }
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
       < ThemeChanger/>

          {token && (
            <div className="flex gap-4">
            <UserButton/>

              <button 
              type="button"
              className="btn btn-ghost px-2 flex justify-center" 
              onClick={logOut}
              >
                <LogOut className="size-5" />
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