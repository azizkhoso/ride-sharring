import React from 'react';
import useAuth from '../hooks/useAuth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import Users from '../components/Admin/Users';
import Vehicles from '../components/Admin/Vehicles';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) navigate('/login', { replace: true });
  }, [isAdmin, navigate]);
  return (
    <Box className="flex flex-col">
      <Heading>Welcome Admin</Heading>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="vehicles" element={<Vehicles />} />
      </Routes>
    </Box>
  );
}
