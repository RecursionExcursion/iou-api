const baseUser = {
  username: "",
  email: "",
  password: "",
  friendIds: [],
  transactions: [],
};

export const createNewUserFactory = (username, email, password) => {
  return {
    ...baseUser,
    username,
    email,
    password,
  };
};

export const buildExistingUser = (user) => {
  return {
    ...baseUser,
    ...user,
  };
};
