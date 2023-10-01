import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { Case, Switch } from 'react-if';

import User from '../../models/User';
import useFetch from '../../hooks/useFetch';
import { IUser } from '../../models/User';
import Loader from '../Loader';
import Error from '../Error';

interface ITableProps {
  columns: string[];
  rows?: Record<string, any>[];
}

function RenderTable(props: ITableProps) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          {props.columns.map((c) => (
            <Th key={c}>{c}</Th>
          ))}
        </Thead>
        <Tbody>
          {props.rows?.map((r, ri) => (
            <Tr key={ri}>
              {Object.keys(r).map((k) => (
                <Td key={k}>{r[k]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

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
            columns={['ID', 'Name', 'Email', 'Balance']}
            rows={users}
          />
        </Case>
      </Switch>
    </Box>
  );
}
