import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);
  return (
    <Box className="flex flex-col">
      <Heading>Welcome {user?.name}</Heading>
    </Box>
  );
}
