import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import User, { IUser } from '../models/User';
import Form from '../components/Form';
import Error from '../components/Error';
import useAuth from '../hooks/useAuth';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    const user = await User.find({ key: 'email', value: data.email });
    if (user[0]) {
      // user is found
      if (user[0].password === data.password) {
        login(user[0] as IUser);
      } else setError('Incorrect password');
    } else setError('User not found');
    setLoading(false);
  };

  React.useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  return (
    <Box className="flex flex-col" w="full">
      <Heading textAlign="center" my={6}>
        Login
      </Heading>
      <Error mt={2} message={error} />
      <Form
        fields={[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ]}
        validationSchema={loginSchema}
        isLoading={isLoading}
        onSubmit={(d) => handleLogin({ email: d.email, password: d.password })}
        submitButtonText="Register"
      />
    </Box>
  );
}
