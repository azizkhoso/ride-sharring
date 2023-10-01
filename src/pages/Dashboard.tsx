import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

import useAuth from '../hooks/useAuth';
import Rides from '../components/User/Rides';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);
  return (
    <Box className="flex flex-col">
      <Heading>Welcome {user?.name}</Heading>
      <Text>Your remaining balance is {user?.balance}</Text>
      <Routes>
        <Route path="rides" element={<Rides />} />
      </Routes>
    </Box>
  );
}
