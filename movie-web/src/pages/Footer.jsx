import React from 'react';
import { Link } from 'react-router-dom';

import ThunkImg from '../resources/images/thunk.png';

function Footer() {
  function handleScrollDownToFeaturesZigzag() {
    document.getElementById("FeaturesZigzag").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">

            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link to="/" className="inline-block" aria-label="Cruip">
                  <img className="max-w-full mx-auto md:max-w-none h-auto" src={ThunkImg} width="50" height="50" alt="ThunkImg" />
                </Link>
              </div>
              <div className="text-gray-400">THUNK Inc.</div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">

              {/* 2rd block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Student ID</h6>
                <ul>
                  <li className="mb-1">
                    <Link to="#" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">190508483</Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Member</h6>
                <ul>
                  <li className="mb-1">
                    <Link to="#" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Fok Wai Chi Eugene</Link>
                  </li>
                </ul>
              </div>

              {/* 4th block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Languages</h6>
                <ul>
                  <li className="mb-1">
                    <Link to="#" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">JavaScript</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="#" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">HTML</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="#" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">CSS</Link>
                  </li>
                </ul>
              </div>

              {/* 5th block */}
              <div className="text-sm">
                <h6 className="text-gray-200 font-medium mb-1">Packages</h6>
                <ul>
                  <li className="mb-1">
                    <Link to="https://reactjs.org/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">React</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="https://mui.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Material-UI</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="https://expressjs.com/zh-tw/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Express</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="https://www.mongodb.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">MongoDB</Link>
                  </li>
                  <li className="mb-1">
                    <Link to="https://mongoosejs.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">Mongoose</Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">

            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li className="ml-4">
                <Link to="#" className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Discord">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="w-8 h-8 fill-current" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">&copy; THUNK Inc. All rights reserved.</div>

          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
