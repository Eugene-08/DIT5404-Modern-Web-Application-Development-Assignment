import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GET } from '../../../utils/APIService';
import { Typography } from '@mui/material';
import { selectMovie, searchTopTen } from '../../../store/reducers/movie';
import StarIcon from '@mui/icons-material/Star';

function FeaturesZigzag() {
  const dispatch = useDispatch();
  const movieState = useSelector(selectMovie);

  function genFeatures() {
    let html = [];
    movieState?.topTen?.movies?.map((item, index) => {
      index % 2 == 0 ? (
        // even index items
        html.push(
          <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
            {/* Image */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
              {console.log('here itemtype', item.details.imagetype)}
              {item.details.imagetype && item.details.image && (
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={`data:image/${item.details?.imagetype};base64, ${item.details?.image}`} width="540" height="405" />
              )}
            </div>
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
              <div className="md:pl-4 lg:pl-12 xl:pl-16">
                <div className="font-architects-daughter text-xl text-purple-600 mb-2">{item.title}</div>
                <p className="text-xl text-gray-400 mb-4">{item.details?.description}</p>
                <ul className="text-lg text-gray-400 -mb-2">
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                    <span>Director: {item.details?.director}</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                    <span>Rating: {item.rating} <StarIcon /></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      ) : (
        // odd index items
        html.push(
          <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
            {/* Image */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
              {item.details.imagetype && item.details.image && (
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={`data:image/${item.details.imagetype};base64, ${item.details.image}`} width="540" height="405" />
              )}
            </div>
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16">
                <div className="font-architects-daughter text-xl text-purple-600 mb-2">{item.title}</div>
                <p className="text-xl text-gray-400 mb-4">{item.details?.description}</p>
                <ul className="text-lg text-gray-400 -mb-2">
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                    <span>Director: {item.details?.director}</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    </svg>
                    <span>Rating: {item.rating} <StarIcon /></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      );
    });

    return html;
  }

  useEffect(() => {
    dispatch(GET(searchTopTen, '/movies/searchTopTen'));
  }, []);

  return (
    <section id="FeaturesZigzag">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">Movies</div>
            <Typography>
              <h1 className="h2 mb-4">Recent Movies</h1>
            </Typography>
            <Typography>
              <p className="text-xl text-gray-400">Top 10 movies</p>
            </Typography>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {movieState?.topTen?.movies?.length > 0 && genFeatures()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;