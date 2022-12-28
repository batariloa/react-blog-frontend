import { isAdmin } from "./isAdmin";

export const showEditDelete = (post, user) => {
  if (post.ownerId === user.id || isAdmin(user)) return true;

  return false;
};
