import { isAdmin } from "./isAdmin";

//show ban button if user is admin && not viewing own profile
export const showBan = (user, username) => {
  console.log(" user username", user.username, " username", username);
  if (!username) return false;
  if (user.username !== username && isAdmin(user)) return true;

  return false;
};
