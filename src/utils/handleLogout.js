export const Logout = (history) => {
  history.push("/");
  localStorage.clear();
};
