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
    checkAuth(); // ✅ Safe to call here inside a React component
    console.log('authUser',authUser)
  }, []);
  if(pending && !authUser) return (
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
            element ={authUser
              ? <HomePage/>
              : <Navigate to='/login'/>}/>
         <Route path="/signup"
              element ={!authUser
              ? <SignUpPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="/login"
              element ={!authUser
              ? <LoginPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="dashboard"
              element ={authUser && userId
              ? <DashboardPage/>
              : <Navigate to='/login'/>}/>
        <Route path="/profile"
          element={ authUser  && userId
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
