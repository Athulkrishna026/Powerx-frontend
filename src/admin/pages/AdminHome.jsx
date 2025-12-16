import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, PieChart, Pie } from 'recharts';



const AdminHome = () => {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
    },
  ];


  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];

  return (
    <>
      <AdminHeader />

      <div className=' md:grid md:grid-cols-[1fr_4fr]'>

        <div>
          <AdminSidebar />
        </div>
        <div className=' p-10 pb-20'>
          <div className=' grid md:grid-cols-1 lg:grid-cols-3'>

            <div className=' md:px-10 px-5'>
              <div className=' bg-blue-800 p-4 flex gap-2 items-center justify-center rounded text-white'>
                <FontAwesomeIcon icon={faBook} className=' text-2xl' />
                <div>
                  <h1 className=' text-lg'>Total Number Of Books</h1>
                  <h1 className=' text-3xl text-center'>100+</h1>
                </div>
              </div>
            </div>
            <div className=' md:px-10 px-5'>
              <div className=' bg-green-800 p-4 flex gap-2 items-center justify-center rounded text-white'>
                <FontAwesomeIcon icon={faUsers} className=' text-2xl' />
                <div>
                  <h1 className=' text-lg '>Total Number Of Users</h1>
                  <h1 className=' text-3xl text-center'>100+</h1>
                </div>
              </div>
            </div>
            <div className=' md:px-10 px-5'>
              <div className=' bg-yellow-600 p-4 flex items-center justify-center rounded text-white'>
                <FontAwesomeIcon icon={faBook} className=' text-2xl' />
                <div>
                  <h1 className=' text-lg'>Total Number Of Employees</h1>
                  <h1 className=' text-3xl text-center'>100+</h1>
                </div>
              </div>
            </div>

          </div>

          <div className=' w-full mt-5 h-96 py-10 grid md:grid-cols-2'>

            <div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart responsive data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>


            <div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  responsive

                >
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    label

                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>


      <Footer />
    </>
  )
}

export default AdminHome