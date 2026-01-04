import React from 'react'

const Preloader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-black via-slate-900 to-black">

      {/* Glass Container */}
      <div className="
        backdrop-blur-xl bg-white/10
        border border-white/20
        rounded-full
        shadow-2xl
        p-5
        flex justify-center items-center
      ">
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyMTA3MmQ0dGJhajlsYXVxMmVmb203bmY2MHl5dHI4bzEwZ3hmNDhlcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tA4R6biK5nlBVXeR7w/giphy.gif"
          className="w-40 md:w-52 rounded-full"
          alt="Loading"
        />

      </div>

    </div>
  )
}

export default Preloader
