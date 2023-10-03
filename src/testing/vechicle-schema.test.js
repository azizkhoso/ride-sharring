import * as yup from 'yup';

const vehicleSchema = yup.object().shape({
  id: yup.string(),
  model: yup.string().required('Model is required'),
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

describe('Vehicle Schema Validation', () => {
  test('Valid Vehicle Object', async () => {
    const validVehicle = {
      id: '1',
      model: 'SUV',
      plateNumber: 'ABC123',
      seats: 5,
      spots: 'A12',
      ticketPrice: 50,
    };

    await expect(vehicleSchema.validate(validVehicle)).resolves.not.toThrow();
  });

  test('Invalid Vehicle Object - Missing Required Fields', async () => {
    const invalidVehicle = {
      id: '1',
      // model is missing
      // plateNumber is missing
      seats: 5,
      // spots is missing
      ticketPrice: 50,
    };

    await expect(vehicleSchema.validate(invalidVehicle)).rejects.toThrowError(/required/);
  });

  test('Invalid Vehicle Object - Negative Seats', async () => {
    const invalidVehicle = {
      id: '1',
      model: 'SUV',
      plateNumber: 'ABC123',
      seats: -5, // Negative seats
      spots: 'A12',
      ticketPrice: 50,
    };

    await expect(vehicleSchema.validate(invalidVehicle)).rejects.toThrowError(/positive integer/);
  });

  test('Invalid Vehicle Object - Negative Ticket Price', async () => {
    const invalidVehicle = {
      id: '1',
      model: 'SUV',
      plateNumber: 'ABC123',
      seats: 5,
      spots: 'A12',
      ticketPrice: -50, // Negative ticket price
    };

    await expect(vehicleSchema.validate(invalidVehicle)).rejects.toThrowError(/positive number/);
  });
});
