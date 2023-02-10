export const isAdmin = (user) => {
  if (!user.roles) return;
  if (user.role === "ADMIN") return true;

  return false;
};
