import { Box, HStack, Spacer, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const links = [
  { title: 'Login', link: '/login', isPublic: true },
  { title: 'Register', link: '/register', isPublic: true },
  { title: 'Dashboard', link: '/dashboard' },
];

export default function Navbar() {
  const { user } = useAuth();
  return (
    <Box
      pos="fixed"
      display="flex"
      bgColor="primary.500"
      w="full"
      px={6}
      py={2}
    >
      <Text color="white" fontWeight="bold">
        Ride Sharring
      </Text>
      <Spacer />
      <HStack>
        {links
          .filter((i) => !user === i.isPublic)
          .map((lnk) => (
            <Text as={Link} to={lnk.link} key={lnk.title} color="white">
              {lnk.title}
            </Text>
          ))}
      </HStack>
    </Box>
  );
}
