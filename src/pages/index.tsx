import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Heading, Stack, StackItem } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';

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
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}
