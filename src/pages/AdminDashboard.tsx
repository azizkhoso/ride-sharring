import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) navigate('/login', { replace: true });
  }, [isAdmin, navigate]);
  return (
    <Box className="flex flex-col">
      <Heading>Welcome Admin</Heading>
    </Box>
  );
}
