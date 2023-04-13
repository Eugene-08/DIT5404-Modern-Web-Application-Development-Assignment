import React, { useState, useEffect } from 'react';
import Header from '../Header';
import PageIllustration from '../PageIllustration';
import Footer from '../Footer';
import { StyledButton } from '../../utils/Button';
import { Container } from '../../utils/Container';
import { Box, Card, Grid, IconButton, Tabs, Typography } from '@mui/material';
import { TabPanelForPage, LinkTab } from '../../utils/TabUtil';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

import Search from './partials/Search';
// import Movie from './partials/Movie';
// import MovieDetail from './partials/MovieDetail';

function Main() {
  const [open, setOpen] = useState({ MovieDetail: false });

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative" style={{ marginTop: 100 }}>
          <Container sx={{ bgcolor: '#333333', opacity: 0.85 }}>
            <Search />
          </Container>
          {/* <Container sx={{ bgcolor: '#333333', opacity: 0.85 }}>
            <Movie />
          </Container> */}
        </div>
      </main>


      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Main;