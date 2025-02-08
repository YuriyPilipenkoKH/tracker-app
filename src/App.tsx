import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import { options } from "./lib/hotToast"
import NotFoundPage from './pages/NotFoundPage';

import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Navbar from './components/nav/Navbar';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const {authUser, userId, checkAuth ,pending} = useAuthStore();
  useEffect(() => {
    if (authUser === undefined) checkAuth() 
   if(!pending) console.log('authUser',authUser)
  }, []);
  if(pending ) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )


  return (
    <div className='min-h-screen flex flex-col gap-12 items-center '>
      <Navbar/>
      <div className='container mx-auto'> 
        <Routes>
        <Route path="/"
            element ={<HomePage/>}/>
         <Route path="/signup"
              element ={!authUser
              ? <SignUpPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="/login"
              element ={!authUser
              ? <LoginPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="dashboard"
              element ={ userId
              ? <DashboardPage/>
              : <Navigate to='/login'/>}/>
        <Route path="/profile"
          element={ userId
              ? <ProfilePage /> 
              : <Navigate to='/login' />}
          />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Toaster
       position="top-center" 
      toastOptions={options} />
    
    </div>
  )
}

export default App
