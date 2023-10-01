import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Heading, Stack, StackItem } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Register from './Register';

export default function Pages() {
  return (
    <Box w="100vw" display="flex" flexDir="column">
      <BrowserRouter>
        <Navbar />
        <Box display="flex" flexDir="column" px={6} py={16}>
          <Routes>
            <Route
              path="/"
              element={
                <Stack>
                  <StackItem>
                    <Heading>Welcome to my app</Heading>
                  </StackItem>
                </Stack>
              }
            />
            <Route path="/login" element={<>Login</>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}
