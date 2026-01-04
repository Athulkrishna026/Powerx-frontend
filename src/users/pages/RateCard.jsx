import React from 'react'
import { useNavigate } from 'react-router-dom'

function RateCard() {

  const navigate = useNavigate()

  const tools = [
    { name: "Cordless Drill", category: "Drilling & Fastening", rate: 500 },
    { name: "Impact Drill", category: "Drilling & Fastening", rate: 600 },
    { name: "Rotary Hammer", category: "Drilling & Fastening", rate: 900 },
    { name: "Impact Wrench", category: "Drilling & Fastening", rate: 700 },
    { name: "Magnetic Drill", category: "Drilling & Fastening", rate: 1200 },

    { name: "Angle Grinder", category: "Cutting & Grinding", rate: 600 },
    { name: "Marble Cutter", category: "Cutting & Grinding", rate: 800 },
    { name: "Circular Saw", category: "Cutting & Grinding", rate: 750 },
    { name: "Metal Cutting Saw", category: "Cutting & Grinding", rate: 1000 },
    { name: "Tile Cutter Machine", category: "Cutting & Grinding", rate: 900 },

    { name: "Jackhammer", category: "Demolition & Heavy-Duty", rate: 1500 },
    { name: "Electric Breaker", category: "Demolition & Heavy-Duty", rate: 1400 },
    { name: "Concrete Chipping Machine", category: "Demolition & Heavy-Duty", rate: 1300 },
    { name: "Demolition Hammer", category: "Demolition & Heavy-Duty", rate: 1600 },
    { name: "Road Breaker", category: "Demolition & Heavy-Duty", rate: 1800 },

    { name: "Electric Sander", category: "Finishing & Polishing", rate: 700 },
    { name: "Wall Sander", category: "Finishing & Polishing", rate: 1000 },
    { name: "Polishing Machine", category: "Finishing & Polishing", rate: 800 },
    { name: "Buffing Machine", category: "Finishing & Polishing", rate: 850 },
    { name: "Floor Polisher", category: "Finishing & Polishing", rate: 1200 },

    { name: "Heat Gun", category: "Specialty Power Tools", rate: 500 },
    { name: "Electric Blower", category: "Specialty Power Tools", rate: 600 },
    { name: "Industrial Vacuum Cleaner", category: "Specialty Power Tools", rate: 1500 },
    { name: "Power Paint Mixer", category: "Specialty Power Tools", rate: 700 },
    { name: "Electric Spray Gun", category: "Specialty Power Tools", rate: 900 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 p-6">

      {/* Left Floating Home Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2 rounded-full
            bg-white/20 backdrop-blur-md
            border border-white/30 text-white
            hover:bg-white/30 transition"
        >
          ⬅ Home
        </button>
      </div>

      {/* Center Glass Card */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl rounded-2xl p-6
          bg-white/10 backdrop-blur-xl
          border border-white/20 shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Power Tools Daily Rate Card
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white border border-white/20">
              <thead className="bg-white/20 backdrop-blur-md">
                <tr>
                  <th className="p-3 border border-white/20">SI No</th>
                  <th className="p-3 border border-white/20 text-left">Tool Name</th>
                  <th className="p-3 border border-white/20">Category</th>
                  <th className="p-3 border border-white/20">Daily Rate (₹)</th>
                </tr>
              </thead>

              <tbody>
                {tools.map((tool, index) => (
                  <tr key={index} className="hover:bg-white/10 transition">
                    <td className="p-3 border border-white/10 text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 border border-white/10 font-medium">
                      {tool.name}
                    </td>
                    <td className="p-3 border border-white/10 text-center">
                      {tool.category}
                    </td>
                    <td className="p-3 border border-white/10 text-center font-semibold">
                      ₹ {tool.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RateCard
