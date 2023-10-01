import React from 'react';
import { Box, Flex, Heading, Radio } from '@chakra-ui/react';
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
  const { login, loginAdmin, user, isAdmin: isAdminLogged } = useAuth();

  const [isAdmin, setAdmin] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    if (isAdmin) {
      if (data.email === 'admin@email.com' && data.password === '12345678')
        loginAdmin();
      else setError('Invalid admin credentials');
    } else {
      const user = await User.find([
        { key: 'email', op: '==', value: data.email },
      ]);
      if (user[0]) {
        // user is found
        if (user[0].password === data.password) {
          login(user[0] as IUser);
        } else setError('Incorrect password');
      } else setError('User not found');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (isAdmin && isAdminLogged) navigate('/admin', { replace: true });
    if (user) navigate('/dashboard', { replace: true });
  }, [user, isAdmin, isAdminLogged, navigate]);

  return (
    <Box className="flex flex-col" w="full">
      <Heading textAlign="center" my={6}>
        Login as {isAdmin ? 'Admin' : 'User'}
      </Heading>
      <Flex gap={4} w="fit-content" mx="auto">
        <Radio isChecked={isAdmin} onChange={() => setAdmin(!isAdmin)}>
          Admin
        </Radio>
        <Radio isChecked={!isAdmin} onChange={() => setAdmin(!isAdmin)}>
          User
        </Radio>
      </Flex>
      <Error mt={2} message={error} />
      <Form
        fields={[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ]}
        validationSchema={loginSchema}
        isLoading={isLoading}
        onSubmit={(d) => handleLogin({ email: d.email, password: d.password })}
        submitButtonText="Login"
      />
    </Box>
  );
}
