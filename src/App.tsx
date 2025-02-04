import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast';
import { options } from "./lib/hotToast"
import NotFoundPage from './pages/NotFoundPage';

function App() {
 

  return (
    <div >
      <Routes>
      <Route path="/" element ={<HomePage/>}/>
      <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
       position="top-center" 
      toastOptions={options} />
    
    </div>
  )
}

export default App
