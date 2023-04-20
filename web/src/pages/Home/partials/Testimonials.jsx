import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../utils/APIService";
import moment from 'moment';
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
                <img src={`data:image/${item.details?.imageType};base64, ${item.details?.image}`} width="48" height="48" />
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
                <img src={`data:image/${item.details?.imageType};base64, ${item.details?.image}`} width="48" height="48" />
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
                <img src={`data:image/${item.details?.imageType};base64, ${item.details?.image}`} width="48" height="48" />
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
    if (authState.loginSuccess && authState?.data?.user?._id) {
      let json = {
        userId: authState.data.user._id
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
