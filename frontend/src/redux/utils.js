import store from "./store";

export const getUserFromUserId = (userId) => store.getState().user.users[userId];
