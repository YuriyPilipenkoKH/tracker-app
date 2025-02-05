import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import { options } from "./lib/hotToast"
import NotFoundPage from './pages/NotFoundPage';

import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Navbar from './components/nav/Navbar';
import DashboardPage from './pages/DashboardPage';

function App() {
  const {authUser, checkAuth ,pending} = useAuthStore();
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
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element ={<HomePage/>}/>
      <Route path="/dashboard" element ={<DashboardPage/>}/>

      <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
       position="top-center" 
      toastOptions={options} />
    
    </div>
  )
}

export default App
