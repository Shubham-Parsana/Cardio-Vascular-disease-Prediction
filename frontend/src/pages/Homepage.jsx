import React from 'react'
import {Link} from 'react-router-dom'
import prediction from "../assets/prediction.jpg";

const Homepage = () => {
    return(
        <>
            <div className='feature flex justify-center items-center '>
                <div className='feature-text p-5'>
                    <div>Predict your chance of having a heart disease because <br></br> prevention is
            better than cure!</div>
                    <div className='flex'>
                        <div className="button mt-5 text-center text"><Link to="/predict" >Predict Now</Link></div>
                        <div className="button mt-5 ml-3 text-center"><Link to="/about">See Analysis</Link></div>
                    </div>
                </div>
                <div className='feature-image p-14 h-[50%] w-[50%]'>
                    <img src={prediction} alt='predict' />
                </div>
            </div>
        </>
    )
}

export default Homepage;