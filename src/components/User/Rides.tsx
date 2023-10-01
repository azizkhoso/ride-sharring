import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Case, Switch } from 'react-if';

import Ride from '../../models/Ride';
import useFetch from '../../hooks/useFetch';
import { IRide } from '../../models/Ride';
import Loader from '../Loader';
import Error from '../Error';
import RenderTable from '../RenderTable';
import Form from '../Form';
import useAuth from '../../hooks/useAuth';
import Vehicle from '../../models/Vehicle';
import User from '../../models/User';

export default function Rides() {
  const { user, refresh } = useAuth();
  const [err, setError] = React.useState('');

  const [allRides, setAllRides] = React.useState<IRide[]>([]);
  const {
    isLoading: isAllLoading,
    error: allError,
    exec,
  } = useFetch<IRide[]>(Ride.find, {
    onSuccess: (rds) => setAllRides(rds),
  });
  const userRides = allRides.filter((r) =>
    r.users.find((u) => u.email === user?.email),
  );
  const [isCreating, setCreating] = React.useState(false);

  const handleCreate = async (spots: string) => {
    setError('');
    setCreating(true);
    const alreadyCreatedRide = allRides.find((r) =>
      r.users.find((u) => u.id === user?.id),
    );
    if (alreadyCreatedRide) {
      setError('You have already a booking');
      setCreating(false);
      return;
    }
    const [vehicle] = await Vehicle.find([
      { key: 'spots', op: '==', value: spots },
    ]);
    if (!vehicle) {
      setError('Vehicle not found');
      setCreating(false);
      return;
    }
    const foundRide = allRides.find((r) => r.vehicle.spots === spots);
    try {
      if (!foundRide) {
        await Ride.create({ vehicle, users: [user], date: new Date() });
      } else {
        if (foundRide.users.length >= foundRide.vehicle.seats) {
          setCreating(false);
          return setError('Vehicle is full');
        } else {
          await Ride.update(foundRide.id, {
            ...foundRide,
            users: [...foundRide.users, user],
            date: new Date(),
          });
        }
      }
      // deduct ticketPrice from user's balance
      if ((user?.balance || 0) - vehicle.ticketPrice < 0) {
        setCreating(false);
        return setError('Low balance');
      }
      await User.update(user?.id || '', {
        ...user,
        balance: (user?.balance || 0) - vehicle.ticketPrice,
      });
      exec();
      refresh();
    } catch (e: any) {
      setError(e || '');
    }
    setCreating(false);
  };
  return (
    <Box className="flex flex-col">
      <Heading mt="8">Ride Bookings</Heading>
      <Switch>
        <Case condition={isAllLoading}>
          <Loader />
        </Case>
        <Case condition={Boolean(allError)}>
          <Error message={allError} />
        </Case>
        <Case condition={userRides.length === 0}>
          <Text textAlign="center">No bookings found</Text>
        </Case>
        <Case condition={userRides.length > 0}>
          <RenderTable
            columns={[
              { key: 'plateNumber', title: 'Vehicle Plate Number' },
              { key: 'model', title: 'Vehicle Model' },
              { key: 'ticketPrice', title: 'Ticket Price' },
              { key: 'spots', title: 'Spots' },
              { key: 'date', title: 'Date' },
            ]}
            rows={userRides.map((obj) => ({
              ...obj.vehicle,
              ...obj,
              date: obj.date.toString(),
            }))}
          />
        </Case>
      </Switch>
      <Switch>
        <Case condition={Boolean(allError)}>
          <Error message={allError} />
        </Case>
        <Case condition={userRides.length >= 0}>
          <Heading textAlign="center" my={6}>
            Add Ride
          </Heading>
          <Error mt={2} message={err} />
          <Form
            fields={[
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
            isLoading={isCreating}
            onSubmit={(d) => handleCreate(d.spots || '')}
            submitButtonText="Add"
          />
        </Case>
      </Switch>
    </Box>
  );
}
