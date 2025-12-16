import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const PaymentSuccess = () => {
  return (
    <div>
        <Header/>
        <div className='grid grid-cols-2 h-140 place-content-center'>
            <div className='p-20'>
                <h2 className='text-blue-700 text-3xl'>Congratulations....</h2>
                <p className='mt-5'>Thank You for shopping with Bookstore...</p>
                <button className='py-1 px-2 bg-blue-500 text-white mt-5 rounded'>Explore More Books</button>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="" style={{width:'450px'}}/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PaymentSuccess