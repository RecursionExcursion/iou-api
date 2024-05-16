const baseUser = {
  username: "",
  password: "",
  balance: 0,
  friendIds: [],
  transactions: [],
  messages: [],
};

export const newUserFactory = (username, password) => {
  return {
    ...baseUser,
    username,
    password,
  };
};
