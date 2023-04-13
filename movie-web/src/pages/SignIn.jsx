import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { SearchForm, TextSearch } from '../utils/FormUtil';
import { POST } from '../utils/APIService';
import { handleSetPopupMessage } from '../store/reducers/util';
import { selectAuth, login } from '../store/reducers/auth';
import Header from './Header';
import PageIllustration from './PageIllustration';
import Banner from './Banner';

function SignIn() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  function handleSignIn(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");

    let json = {
      username,
      password,
    };

    dispatch(POST(login, '/accounts/login', json));
  }

  useEffect(() => {
    if (authState.loginSuccess) {
      window.location.assign(authState.redirectTo);
    }
  }, [authState.loginSuccess]);

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
                <h1 className="h1">Welcome back. We exist to make entrepreneurship easier.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <SearchForm onSubmit={(e) => handleSignIn(e)} submitText={"Sign in"}>
                  <TextSearch name={"username"} label={"Username"} />
                  <TextSearch name={"password"} label={"Password"} type={"password"} />
                </SearchForm>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
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

export default SignIn;