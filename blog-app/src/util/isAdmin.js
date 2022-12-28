export const isAdmin = (user) => {
  if (user.roles.includes("Admin")) return true;

  return false;
};
