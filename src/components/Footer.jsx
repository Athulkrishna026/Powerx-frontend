import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faXTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer
        className="bg-gradient-to-br from-black via-slate-900 to-black
                   text-white px-6 md:px-20 py-14
                   border-t border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faToolbox} className="text-yellow-400 text-xl" />
              <h2 className="text-lg font-semibold tracking-wide">
                PowerX
              </h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              We provide premium-quality power tools on rent for professionals
              and home users. From drilling and cutting to demolition and
              finishing, our tools are reliable, affordable, and ready to
              perform.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-4 tracking-wide">
              NEWSLETTER
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Get updates on new tools, offers, and rental plans.
            </p>

            <div className="flex max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-3 rounded-l-lg
                           bg-white/90 text-black
                           placeholder-gray-500
                           focus:outline-none"
              />

              <button
                className="px-4 rounded-r-lg
                           bg-yellow-400 text-black
                           hover:bg-yellow-300 transition"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold mb-4 tracking-wide">
              FOLLOW US
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Stay connected with us
            </p>

            <div className="flex gap-5 text-xl">
              <FontAwesomeIcon
                icon={faInstagram}
                className="cursor-pointer hover:text-yellow-400 transition"
              />
              <FontAwesomeIcon
                icon={faXTwitter}
                className="cursor-pointer hover:text-yellow-400 transition"
              />
              <FontAwesomeIcon
                icon={faFacebook}
                className="cursor-pointer hover:text-yellow-400 transition"
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="cursor-pointer hover:text-yellow-400 transition"
              />
            </div>
          </div>

        </div>
      </footer>

      {/* Bottom Bar */}
      <div
        className="bg-black/90 backdrop-blur-md
                   text-center text-gray-300
                   py-4 text-sm border-t border-white/10"
      >
        © 2025 All rights reserved | Built with ❤️ by{' '}
        <span className="text-yellow-400 font-semibold">
          Athul
        </span>
      </div>
    </>
  )
}

export default Footer

