import React, { useState, useEffect } from 'react';
import { Container } from '../../utils/Container';

import Search from './partials/Search';

function Main() {
  const [open, setOpen] = useState({ MovieDetail: false });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Page content */}
      <main className="grow">

        {/*  Page sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative" style={{ marginTop: 100 }}>
          <Container sx={{ bgcolor: '#333333', opacity: 0.85 }}>
            <Search />
          </Container>
        </div>
      </main>

    </div>
  );
}

export default Main;