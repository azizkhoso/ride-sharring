import { create } from 'zustand';
import { IUser } from '../models/User';

interface IUseAuth {
  user: undefined | IUser;
  isAdmin?: boolean;
  login: (usr: IUser) => any;
  loginAdmin: () => any;
  logout: () => any;
}

const useAuth = create<IUseAuth>((set) => ({
  user: undefined,
  login: (usr: IUser) => {
    set(() => ({ user: usr }));
  },
  loginAdmin: () => {
    set(() => ({ isAdmin: true }));
  },
  logout: () => {
    set((st) => ({ ...st, user: undefined, isAdmin: false }));
  },
}));

export default useAuth;
