import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Case, Default, Switch, When } from 'react-if';

const publicLinks = [
  { title: 'Login', link: '/login' },
  { title: 'Register', link: '/register' },
];

const userLinks = [{ title: 'Dashboard', link: '/dashboard' }];

const adminLinks = [{ title: 'Dashboard', link: '/admin' }];

const MobileMenu = (props: { isOpen: boolean; onClose: () => void }) => {
  const { user, isAdmin } = useAuth();
  return (
    <Drawer placement="left" isOpen={props.isOpen} onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader fontWeight="medium">
          <Box className="flex items-center" gap={6}>
            <Box as={Link} to="/" className="link">
              <Text color="primary.500" fontWeight="bold" my="auto">
                Ride Sharring
              </Text>
            </Box>
          </Box>
        </DrawerHeader>
        <DrawerCloseButton onClick={props.onClose} />
        <DrawerBody as={VStack} align="flex-start" spacing={6} pt="60px">
          <Switch>
            <Case condition={isAdmin}>
              {adminLinks.map((lnk) => (
                <Text
                  as={Link}
                  to={lnk.link}
                  key={lnk.title}
                  fontSize="xl"
                  alignSelf="center"
                >
                  {lnk.title}
                </Text>
              ))}
            </Case>
            <Case condition={Boolean(user)}>
              {userLinks.map((lnk) => (
                <Text
                  as={Link}
                  to={lnk.link}
                  key={lnk.title}
                  fontSize="xl"
                  alignSelf="center"
                >
                  {lnk.title}
                </Text>
              ))}
            </Case>
            <Default>
              {publicLinks.map((lnk) => (
                <Text
                  as={Link}
                  to={lnk.link}
                  key={lnk.title}
                  fontSize="xl"
                  alignSelf="center"
                >
                  {lnk.title}
                </Text>
              ))}
            </Default>
          </Switch>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box
      pos="fixed"
      display="flex"
      bgColor="primary.500"
      w="full"
      px={6}
      py={2}
    >
      <Text color="white" fontWeight="bold" my="auto">
        Ride Sharring
      </Text>
      <Spacer />
      <HStack alignItems="center" display={{ base: 'none', lg: 'flex' }}>
        <Switch>
          <Case condition={isAdmin}>
            {adminLinks.map((lnk) => (
              <Text as={Link} to={lnk.link} key={lnk.title} color="white">
                {lnk.title}
              </Text>
            ))}
          </Case>
          <Case condition={Boolean(user)}>
            {userLinks.map((lnk) => (
              <Text as={Link} to={lnk.link} key={lnk.title} color="white">
                {lnk.title}
              </Text>
            ))}
          </Case>
          <Default>
            {publicLinks.map((lnk) => (
              <Text as={Link} to={lnk.link} key={lnk.title} color="white">
                {lnk.title}
              </Text>
            ))}
          </Default>
        </Switch>
        <When condition={isAdmin || Boolean(user)}>
          <Button variant="solid" onClick={() => logout()}>
            Logout
          </Button>
        </When>
      </HStack>
      <Button
        variant="solid"
        onClick={() => onOpen()}
        fontSize="2xl"
        fontWeight="bold"
        size="sm"
        display={{ base: 'flex', lg: 'none' }}
      >
        ::
      </Button>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
