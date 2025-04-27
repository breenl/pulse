import React, { useState } from 'react';
import MarketPulseApp from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MarketPulseApp />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;