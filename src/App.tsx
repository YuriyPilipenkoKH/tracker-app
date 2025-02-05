import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import { options } from "./lib/hotToast"
import NotFoundPage from './pages/NotFoundPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth(); // ✅ Safe to call here inside a React component
  }, []);
  return (
    <>
      <Routes>
      <Route path="/" element ={<HomePage/>}/>
      <Route path="/api/auth/*" element={<AuthCallbackPage />} /> 
      <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
       position="top-center" 
      toastOptions={options} />
    
    </>
  )
}

export default App
