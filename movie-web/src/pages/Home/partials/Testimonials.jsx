import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../utils/APIService";
import moment from 'moment';
import { Typography, Paper } from "@mui/material";
import styles from "../../../utils/index.module.css";
import { Container } from '../../../utils/Container';
import { SearchForm, TextSearch } from '../../../utils/FormUtil';
import { dateFormat, timeFormat } from '../../../utils/Constant';
import { selectMovie, getFavourite } from '../../../store/reducers/movie';
import { selectAuth } from '../../../store/reducers/auth';

function Testimonials() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const movieState = useSelector(selectMovie);
  const [now, setNow] = useState(moment());

  function genFavourites() {
    let html = [];
    movieState?.userFavourite?.userFavouriteMovies?.at(0)?.userFavouriteMovies?.map((item, index) => {
      index % 3 == 2 ? (
        html.push(
          <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
            <div>
              <div className="relative inline-flex flex-col mb-4">
                <img className="rounded-full" src={`data:image/${item.details?.imagetype};base64, ${item.details?.image}`} width="48" height="48" />
                <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-400 grow">{item.title}</blockquote>
          </div>
        )
      ) : index % 3 == 1 ? (
        html.push(
          <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
            <div>
              <div className="relative inline-flex flex-col mb-4">
                <img className="rounded-full" src={`data:image/${item.details?.imagetype};base64, ${item.details?.image}`} width="48" height="48" />
                <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-400 grow">{item.title}</blockquote>
          </div>
        )
      ) : (
        html.push(
          <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
            <div>
              <div className="relative inline-flex flex-col mb-4">
                <img className="rounded-full" src={`data:image/${item.details?.imagetype};base64, ${item.details?.image}`}width="48" height="48"/>
                <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-lg text-gray-400 grow">{item.title}</blockquote>
          </div>
        )
      );
    });
    return html;
  }

  useEffect(() => {
    if (authState.loginSuccess && authState.data.user._id) {
      let json = {
        userid: authState.data.user._id
      };
      dispatch(POST(getFavourite, '/accounts/searchUserFavourite', json));
    }
  }, [authState.loginSuccess]);

  return (
    <section id="Testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">My Favourites</h2>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
            {movieState?.userFavourite?.userFavouriteMovies?.at(0)?.userFavouriteMovies?.length > 0 && genFavourites()}
          </div>
        </div>
      </div>
    </section >
  );
}

export default Testimonials;
