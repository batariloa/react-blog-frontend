import { isAdmin } from "./isAdmin";

export const showEdit = (post, user) => {
  if (post.ownerId === user.id) return true;

  return false;
};

export const showDelete = (post, user) => {
  if (post.ownerId === user.id || isAdmin(user)) return true;

  return false;
};
