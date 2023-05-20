const useReturnTo = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { returnTo } = Object.fromEntries(urlParams.entries());

  return returnTo;
};

export default useReturnTo;
