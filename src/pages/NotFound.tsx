import useLogout from "../shared/hooks/useLogout";

const NotFound = () => {
  const logout = useLogout();

  return (
    <>
      <h1>
        404
        <br />
        The Page Your Looking for Not Found
      </h1>
      <br />
      <button onClick={logout}>back to sign in</button>
    </>
  );
};

export default NotFound;
