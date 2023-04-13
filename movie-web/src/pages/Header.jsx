import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, logout } from '../store/reducers/auth';
import Dropdown from '../utils/Dropdown';
import { useConfirm } from "material-ui-confirm";
import ThunkImg from '../resources/images/thunk.png';
import { StyledButton } from '../utils/Button';

function Header() {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const authState = useSelector(selectAuth);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  function handleLogout() {
    confirm({ title: "", confirmationText: "Logout", cancellationText: "Cancel", description: "Logout?" })
      .then(() => {
        dispatch(logout());
      })
      .catch(() => console.log("cancel logout"));
  }

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/public" className="block" aria-label="Cruip">
              <img className="max-w-full mx-auto md:max-w-none h-auto" src={ThunkImg} width="50" height="50" alt="ThunkImg" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop sign in links */}
            {
              !authState.loginSuccess ? (
                <ul className="flex grow justify-end flex-wrap items-center">
                  <li>
                    <Link to="/signin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">Sign up</Link>
                  </li>
                </ul>
              ) : (
                <ul className="flex grow justify-end flex-wrap items-center">
                  <li>
                    <StyledButton name={"Logout"} label={"Logout"} onClick={() => handleLogout()} />
                  </li>
                </ul>
              )
            }


          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
