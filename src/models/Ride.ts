import * as yup from 'yup';

import FirebaseModel from '../config/FirebaseModel';
import { IVehicle, vehicleSchema } from './Vehicle';
import { IUser, userSchema } from './User';

export interface IRide {
  id: string;
  vehicle: IVehicle;
  users: IUser[];
  date: Date;
}

export const rideSchema = yup.object().shape({
  id: yup.string(),
  vehicle: vehicleSchema.required('Vehicle is required'),
  users: yup.array().of(userSchema).required('Users are required'),
  date: yup.date().required('Date is required'),
});

const Ride = new FirebaseModel('rides', rideSchema);

export default Ride;
