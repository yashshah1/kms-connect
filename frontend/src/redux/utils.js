import store from "./store";

export const getUserFromUserId = (userId, minified = false) => {
  const user = userId > 10001 ? store.getState().user.users[userId] : null;
  if (!user) return user;
  if (minified) {
    const minifiedUser = {};
    minifiedUser["fullname"] = user["fullname"];
    minifiedUser["person_no"] = user["person_no"];
    return minifiedUser;
  } else return user;
};
