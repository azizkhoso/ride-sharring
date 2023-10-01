import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import './App.css';
import Pages from './pages';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Pages />
    </ChakraProvider>
  );
}

export default App;
