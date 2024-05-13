export class User {
  id = "";
  username = "";
  email = "";
  password = "";
  friendIds = [];
  transactions = [];

  constructor({ id, username, email, password, friendIds, transactions }) {
    requireField([username, email, password]);

    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    if (!friendIds) {
      console.log("No friends found");

      friendIds = [];
    }

    if (!transactions) {
      console.log("No transactions found");
      transactions = [];
    }
  }

  static createNewUser(username, email, password) {
    this.id = null;
    this.username = username;
    this.email = email;
    this.password = password;
    this.friendIds = [];
    this.transactions = [];
    return new User("", username, email, password);
  }

  toJson = () => {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      friendIds: this.friendIds,
      transactions: this.transactions,
    };
  };
}

const requireField = (requiredFieldsArr) => {
  requiredFieldsArr.forEach((field) => {
    if (!field) {
      throw new Error(`Missing required fields: name, email, password`);
    }
  });
};
