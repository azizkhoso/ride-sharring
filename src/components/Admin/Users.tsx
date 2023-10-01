import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Case, Switch } from 'react-if';

import User from '../../models/User';
import useFetch from '../../hooks/useFetch';
import { IUser } from '../../models/User';
import Loader from '../Loader';
import Error from '../Error';
import RenderTable from '../RenderTable';

export default function Users() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const { isLoading, error } = useFetch<IUser[]>(User.find, {
    onSuccess: (usrs) => setUsers(usrs),
  });
  return (
    <Box className="flex flex-col">
      <Heading mt="8">Users</Heading>
      <Switch>
        <Case condition={isLoading}>
          <Loader />
        </Case>
        <Case condition={Boolean(error)}>
          <Error message={error} />
        </Case>
        <Case condition={users.length === 0}>
          <Text textAlign="center">No users found</Text>
        </Case>
        <Case condition={users.length > 0}>
          <RenderTable
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'email', title: 'Email' },
              { key: 'balance', title: 'Balance' },
            ]}
            rows={users}
          />
        </Case>
      </Switch>
    </Box>
  );
}
