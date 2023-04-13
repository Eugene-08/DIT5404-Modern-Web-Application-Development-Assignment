import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { SearchForm, TextSearch } from '../utils/FormUtil';
import { POST } from '../utils/APIService';
import { handleSetPopupMessage } from '../store/reducers/util';
import { selectAuth, signup, verifyExist } from '../store/reducers/auth';
import { Grid } from '@mui/material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
import Header from './Header';
import PageIllustration from './PageIllustration';
import Banner from './Banner';

function SignUp() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  const [verifyExistUser, setVerifyExistUser] = useState(false);

  function handleVerfyUser(username) {
    if (username.length > 0) {
      dispatch(POST(verifyExist, '/accounts/verifyUser', { username: username }));
    }
  }

  function handleSignUp(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");

    let json = {
      username,
      password,
    };

    if (verifyExistUser) {
      dispatch(POST(signup, '/accounts/usersignup', json));
    }
  }

  useEffect(() => {
    if (authState.verifyExistSuccess) {
      setVerifyExistUser(true);
    } else {
      setVerifyExistUser(false);
    }
    if (authState.signupSuccess) {
      dispatch(handleSetPopupMessage({
        msg: {
          message: "Signup Success",
          open: true,
          severity: "success",
        }
      }));
      window.location.assign('/signin');
    }
  }, [authState.signupSuccess, authState.verifyExistSuccess]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <SearchForm onSubmit={(e) => handleSignUp(e)} submitText={"Sign up"} disabledSubmit={!verifyExistUser}>
                  <TextSearch name={"username"} label={"Username"} onBlur={(e) => handleVerfyUser(e.target.value)} />
                  <TextSearch name={"password"} label={"Password"} type={"password"} />
                </SearchForm>
                <div className="text-gray-400 text-center mt-6">
                  Already have an account? <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

export default SignUp;