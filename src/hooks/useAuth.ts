import { create } from 'zustand';
import { IUser } from '../models/User';

interface IUseAuth {
  user: undefined | IUser;
  login: (usr: IUser) => any;
  logout: () => any;
}

const useAuth = create<IUseAuth>((set) => ({
  user: undefined,
  login: (usr: IUser) => {
    set(() => ({ user: usr }));
  },
  logout: () => {
    set((st) => ({ ...st, user: undefined }));
  },
}));

export default useAuth;
