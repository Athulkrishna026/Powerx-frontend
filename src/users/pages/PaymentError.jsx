import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const PaymentError = () => {
    return (
        <div>
            <Header />
            <div className='grid grid-cols-2 h-140 place-content-center'>
                <div className='p-20'>
                    <h2 className='text-blue-700 text-3xl'>Sorry! Your Payment Unsuccessfull....</h2>
                    <p className='mt-5'>We apologize for the inconvinience caused......</p>
                    <button className='py-1 px-2 bg-blue-500 text-white mt-5 rounded'>Explore More Books</button>
                </div>
                <div className='flex justify-center items-center'>
                    <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" style={{ width: '450px' }} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentError