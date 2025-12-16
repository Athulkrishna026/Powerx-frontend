import React from 'react'

const Preloader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='md:grid grid-cols-3'>
                <div></div>
                <div className='flex justify-center items-center p-5 md:p-0'>
                    <img src="https://blog-static.userpilot.com/blog/wp-content/uploads/2024/09/custom-preloader-example.gif" alt="Page not found" />
                </div>
                <div></div>
            </div>
        </div>
    )
}
export default Preloader