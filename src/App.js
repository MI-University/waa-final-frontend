import { ScrollToTop } from '@components/common';
import { DataProvider } from '@store/providers';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { persistor } from './store';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          {routes}
        </PersistGate>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
