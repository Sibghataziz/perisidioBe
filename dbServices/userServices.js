import UserModel from "../models/user.js";

async function findOneUserByQuery(query) {
  const user = await UserModel.findOne(query);
  return user;
}

async function findUsersByQuery(query) {
  const users = await UserModel.find(query);
  return users;
}

async function insertUser(user) {
  const newUser = await UserModel.create([user]);
  return newUser;
}

export default {
  findOneUserByQuery,
  findUsersByQuery,
  insertUser,
};
