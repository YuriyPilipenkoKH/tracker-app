import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { Container } from './components/container/Container'


function App() {


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

    </>
  )
}

export default App
