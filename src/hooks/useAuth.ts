import { create } from 'zustand';

interface IUseAuth {
  user: undefined | Record<string, any>;
  login: (usr: Record<string, any>) => any;
  logout: () => any;
}

const useAuth = create<IUseAuth>((set) => ({
  user: undefined,
  login: (usr: Record<string, any>) => {
    set(() => ({ user: usr }));
  },
  logout: () => {
    set((st) => ({ ...st, user: undefined }));
  },
}));

export default useAuth;
