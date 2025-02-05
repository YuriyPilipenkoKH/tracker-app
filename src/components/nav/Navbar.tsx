import { LogOut,  User ,} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import ThemeChanger from "../button/ThemeChanger";
import Logo from "./Logo";



const Navbar = () => {
  const {  authUser, logOut } = useAuthStore();
  //
  return (
    <header
      className=" border-b border-base-300  w-full " >
    <div className="container mx-auto px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Logo/>
            </div>
            <h1 className="text-lg font-bold">Tracker</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
       < ThemeChanger/>
          {/* <Link
            to={"/login"}
            className={`btn btn-sm gap-2 transition-colors `}
          >
         
            <span className="hidden sm:inline">Login</span>
          </Link> */}

          {authUser && (
            <>
              <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button 
              type="button"
              className="flex gap-2 items-center" 
              onClick={logOut}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);
};


export default Navbar