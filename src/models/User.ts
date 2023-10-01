import * as yup from 'yup';

import FirebaseModel from '../config/FirebaseModel';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
}

export const userSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  balance: yup.number().positive(),
});

const User = new FirebaseModel('users', userSchema, { unique: 'email' });

export default User;
