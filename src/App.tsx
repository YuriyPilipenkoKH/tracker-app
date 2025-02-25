import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import { options } from "./lib/hotToast"
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/layout/Layout';
import { Container } from './components/container/Container';
import { Loader } from 'lucide-react';

function App() {
  const { userId, checkAuth , token, pending } = useAuthStore();
  useEffect(() => {
    checkAuth() 
  }, [userId]);


  return (
    <>

      <Container>
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={< HomePage />}/>
         <Route path="/signup"
            element ={!token
              ? <SignUpPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="/login"
            element ={!token
              ? <LoginPage/>
              : <Navigate to='/dashboard'/>}/>
        <Route path="dashboard"
            element ={ token
              ? <DashboardPage/>
              : <Navigate to='/login'/>}/>
        <Route path="/profile"
            element={ token
              ? <ProfilePage /> 
              : <Navigate to='/login' />}
              />
        <Route path="*" 
            element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>

      <Toaster
        position="top-center" 
        toastOptions={options} />

      {pending && (
      <div className="absolute flex items-center justify-center bg-transparent">
        <Loader className="size-10 animate-spin"/>
      </div>
      )}
    
    </>
  )
}

export default App
