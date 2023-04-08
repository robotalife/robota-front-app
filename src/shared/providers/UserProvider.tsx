import { createContext, PropsWithChildren, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

interface IUser {
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface IUserContext {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
