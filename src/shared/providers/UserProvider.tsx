import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import apiEndPoints from "../consts/apiEndpoints";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import { string } from "yup";

interface IUserResponseObj {
  email: string;
  firstName: string | null;
  lastName: string | null;
}
interface IUser extends IUserResponseObj {
  userId: string;
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
  const { isAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: null,
    lastName: null,
    userId: localStorage.getItem("userId"),
  } as IUser);

  const getUser = async () => {
    try {
      const response: AxiosResponse<IUserResponseObj, any> = await axios.get(
        apiEndPoints.userInfo
      );

      const userObj = response.data;

      setUser({ ...user, ...userObj });
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
