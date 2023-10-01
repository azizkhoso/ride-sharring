import * as yup from 'yup';

import FirebaseModel from '../config/FirebaseModel';

export interface IVehicle {
  id: string;
  model: string;
  plateNumber: string;
  seats: number;
  spots: string;
  ticketPrice: number;
}

export const vehicleSchema = yup.object().shape({
  id: yup.string(),
  model: yup.string().required('Modle is required'),
  plateNumber: yup.string().required('Plate number is required'),
  seats: yup
    .number()
    .integer()
    .positive()
    .required('Number of seats must be a positive integer'),
  spots: yup.string().required('Spots information is required'),
  ticketPrice: yup
    .number()
    .positive()
    .required('Ticket price must be a positive number'),
});

const Vehicle = new FirebaseModel('vehicles', vehicleSchema, {
  unique: 'plateNumber',
});

export default Vehicle;
