const baseUser = {
  username: "",
  password: "",
  balance: 0,
  friendIds: [],
  transactions: [],
};

export const newUserFactory = (username, password) => {
  return {
    ...baseUser,
    username,
    password,
  };
};

export const buildExistingUser = (user) => {
  return {
    ...baseUser,
    ...user,
  };
};
