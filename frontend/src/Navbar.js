import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <>
            <div className='navbar flex justify-between '>
                <div className='logo'>
                    <h1>Cardio Vascular Disease Prediction</h1>
                </div>
                <div className='links'>
                    <Link to='/'>Home</Link>
                    <Link to='/feature'>Feature</Link>
                    <Link to='/predict'>Predict</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar