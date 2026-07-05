import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <>
            <div className='navbar flex justify-between items-center p-4 '>
                <div className='logo bg-transparent text-2xl '>
                    <h1 className='bg-transparent'>Cardio Vascular Disease Prediction</h1>
                </div>
                <div className='links flex  border-2 border-black p-3 rounded-full w-2/5 items-center '> 
                    <Link to='/' className='hover:border-white hover:line-through
                    hover:rounded-full px-16 py-1'>Home</Link>
                    <Link to='/feature' className='hover:border-white hover:line-through
                    hover:rounded-full px-16 py-1'>Feature</Link>
                    <Link to='/predict' className='hover:border-white hover:line-through
                    hover:rounded-full px-16 py-1'>Predict</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar