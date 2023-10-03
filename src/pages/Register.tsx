import { Box, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import User, { userSchema } from '../models/User';
import Form from '../components/Form';
import useFetch from '../hooks/useFetch';
import Error from '../components/Error';
import vehicleImage from '../images/vehicle-greenline.jpeg';

export default function Register() {
  const navigate = useNavigate();
  const { isLoading, error, exec } = useFetch(User.create, {
    onSuccess: () => navigate('/login'),
    execOnMount: false,
  });
  return (
    <Box className="flex flex-col" w="full">
      <Heading textAlign="center" my={6}>
        Register
      </Heading>
      <Image src={vehicleImage} alt="vehicle" maxW="700px" mx="auto" />
      <Error mt={2} message={error} />
      <Form
        fields={[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Initial Balance', name: 'balance', type: 'number' },
        ]}
        validationSchema={userSchema}
        isLoading={isLoading}
        onSubmit={(d) => exec(d)}
        submitButtonText="Register"
      />
    </Box>
  );
}
