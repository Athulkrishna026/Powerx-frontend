import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faXTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="bg-[#0B1320] text-white px-6 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-lg font-semibold mb-3">ABOUT US</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              At our bookstore, we believe every book holds the power to change a life. We bring together stories that inspire, educate, and spark imagination. Whether you're a dreamer, a learner, or a wanderer — there’s a book here waiting for you
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">NEWSLETTER</h2>
            <p className="text-gray-300 text-sm mb-4">Stay updated with our latest trends</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email ID"
                className="w-100px p-2 rounded-l bg-white text-black placeholder-gray-500 focus:outline-none"
              />

              <button className="bg-yellow-400 text-black px-2 rounded-r">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">FOLLOW US</h2>
            <p className="text-gray-300 text-sm mb-4">Let us be social</p>
            <div className="flex space-x-4 text-xl">
              <FontAwesomeIcon icon={faInstagram} className="hover:text-yellow-400 cursor-pointer" />
              <FontAwesomeIcon icon={faXTwitter} className="hover:text-yellow-400 cursor-pointer" />
              <FontAwesomeIcon icon={faFacebook} className="hover:text-yellow-400 cursor-pointer" />
              <FontAwesomeIcon icon={faLinkedin} className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-black text-center text-white py-3 text-sm">
        Copyright © 2025 All rights reserved | This website is made with ❤️ by{' '}
        <span className="font-semibold text-yellow-400">Athul</span>
      </div>
    </>
  );
};

export default Footer;
