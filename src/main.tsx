import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* the next component changes loading order of style injection for MUI. DON't touch it. */}
    <StyledEngineProvider injectFirst>
      {/* the next component injects normalize css to application. DON't touch it. */}
      <CssBaseline />
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
