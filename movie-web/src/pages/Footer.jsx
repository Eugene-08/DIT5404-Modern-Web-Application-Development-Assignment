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

            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">&copy; THUNK Inc. All rights reserved.</div>

          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
