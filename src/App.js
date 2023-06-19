import { ScrollToTop } from '@components/common';
import { DataProvider } from '@store/providers';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <ScrollToTop />
        {routes}
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
