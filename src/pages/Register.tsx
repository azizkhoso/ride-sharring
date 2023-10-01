import { Box, Heading } from '@chakra-ui/react';

import User, { userSchema } from '../models/User';
import Form from '../components/Form';
import useFetch from '../hooks/useFetch';
import Error from '../components/Error';

export default function Register() {
  const { isLoading, error, exec } = useFetch(User.create, {
    onSuccess: (usr) => console.log({ usr }),
    onError: (err) => console.log(err),
    execOnMount: false,
  });
  return (
    <Box className="flex flex-col" w="full">
      <Heading textAlign="center" my={6}>
        Register
      </Heading>
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
