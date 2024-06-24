// App.tsx
import React from 'react';
import {Router} from './Routes/Router';
import {AppwriteProvider} from './Context/Context';

function App(): JSX.Element {
  return (
    <AppwriteProvider>
      <Router />
    </AppwriteProvider>
  );
}

export default App;
