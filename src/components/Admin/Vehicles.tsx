import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Case, Switch } from 'react-if';

import Vehicle, { vehicleSchema } from '../../models/Vehicle';
import useFetch from '../../hooks/useFetch';
import { IVehicle } from '../../models/Vehicle';
import Loader from '../Loader';
import Error from '../Error';
import RenderTable from '../RenderTable';
import Form from '../Form';

export default function Vehicles() {
  const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);
  const { isLoading, error, exec } = useFetch<IVehicle[]>(Vehicle.find, {
    onSuccess: (usrs) => setVehicles(usrs),
  });
  const {
    isLoading: isCreating,
    error: createError,
    exec: createVehicle,
  } = useFetch(Vehicle.create, {
    onSuccess: () => exec(),
    execOnMount: false,
  });
  return (
    <Box className="flex flex-col">
      <Heading mt="8">Electric Vehicles</Heading>
      <Switch>
        <Case condition={isLoading}>
          <Loader />
        </Case>
        <Case condition={Boolean(error)}>
          <Error message={error} />
        </Case>
        <Case condition={vehicles.length === 0}>
          <Text textAlign="center">No vehicles found</Text>
        </Case>
        <Case condition={vehicles.length > 0}>
          <RenderTable
            columns={[
              { key: 'plateNumber', title: 'Plate Number' },
              { key: 'model', title: 'Model' },
              { key: 'seats', title: 'Seats' },
              { key: 'ticketPrice', title: 'Ticket Price' },
              { key: 'spots', title: 'Spots' },
            ]}
            rows={vehicles}
          />
        </Case>
      </Switch>

      <Heading textAlign="center" my={6}>
        Add Vehicle
      </Heading>
      <Error mt={2} message={createError} />
      <Form
        fields={[
          { label: 'Model', name: 'model', type: 'text' },
          { label: 'Plate Number', name: 'plateNumber', type: 'text' },
          { label: 'Seats', name: 'seats', type: 'number' },
          { label: 'Ticket Price', name: 'ticketPrice', type: 'number' },
          {
            label: 'Spots',
            name: 'spots',
            type: 'select',
            options: [
              { title: 'A->B->C', value: 'A,B,C' },
              { title: 'D->B->C', value: 'D,B,C' },
              { title: 'A->D->C', value: 'A,D,C' },
              { title: 'C->B->A', value: 'C,B,A' },
            ],
          },
        ]}
        validationSchema={vehicleSchema}
        isLoading={isCreating}
        onSubmit={(d) => createVehicle(d)}
        submitButtonText="Add"
      />
    </Box>
  );
}
