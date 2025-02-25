import { Suspense } from 'react'
import { MainFooter, MainHeader } from './Layout.styled'
import { Outlet } from 'react-router-dom'
// import Navbar from '../nav/Navbar'




const Layout = () => {


    return (
    <>
      <MainHeader  className="main-header" >
        {/* <Navbar/> */}
      </MainHeader>
        <Suspense >
            <Outlet />
        </Suspense>
        <MainFooter >
          {'lang.footerTitle'} 
        </MainFooter>
      </>
    )}

export default Layout