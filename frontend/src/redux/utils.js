import store from "./store";

export const getUserFromUserId = (userId) =>
  userId > 10001 ? store.getState().user.users[userId] : null;
