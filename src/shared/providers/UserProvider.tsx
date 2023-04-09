import { createContext, PropsWithChildren, useContext, useState } from "react";
import apiEndPoints from "../consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";

interface IUser {
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface IUserContext {
  user: IUser;
  getUser: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  getUser: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { axios } = useAxios();
  const [user, setUser] = useState<IUser>({} as IUser);

  const getUser = async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.get(
        apiEndPoints.userInfo
      );

      setUser(response.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
