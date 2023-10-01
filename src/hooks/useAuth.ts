import { create } from 'zustand';
import User, { IUser } from '../models/User';

interface IUseAuth {
  user: undefined | IUser;
  isAdmin?: boolean;
  login: (usr: IUser) => any;
  loginAdmin: () => any;
  logout: () => any;
  refresh: () => any;
}

const useAuth = create<IUseAuth>((set, get) => ({
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
  refresh: () => {
    const usr = get().user;
    User.findById(usr?.id || '').then(() => {
      set((st) => ({ ...st, user: usr }));
    });
  },
}));

export default useAuth;
