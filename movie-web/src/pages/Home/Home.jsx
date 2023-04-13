import React from 'react';

import Header from '../Header';
import PageIllustration from '../PageIllustration';
import LandingPage from './partials/LandingPage';
import FeaturesZigZag from './partials/FeaturesZigzag';
import Testimonials from './partials/Testimonials';
import Banner from '../Banner';
import Footer from '../Footer';

function Home() {
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

        {/*  Page sections */}
        <LandingPage />
        <FeaturesZigZag />
        <Testimonials />
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;