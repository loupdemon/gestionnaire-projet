
import React from 'react'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// un hooks qui permet la réutilsiation de component 
// il  permet de rajouter par ex la navbar dans toutes les pages
type Wrapperprops = {
    children : React.ReactNode
}
const Wrapper = ({children} : Wrapperprops) => {
  return (
    <div>
   
    <Navbar/>
    <div className='px-5 md:px-[10%] mt-8 mb-10'>
        <ToastContainer 
            position='top-right'
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
        />
        {children}
    </div>
</div>
)
}

export default Wrapper