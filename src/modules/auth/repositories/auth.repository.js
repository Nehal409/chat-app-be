import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const createUser = async (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return User.findById(userId).select("-password");
};

export const findByUserIdAndUpdate = async (userId, payload) => {
  return User.findByIdAndUpdate(userId, payload, { new: true }).select(
    "-password"
  );
};

export const filteredUsers = async (userId) => {
  // Return all the users other than logged in user
  return User.find({ _id: { $ne: userId } }).select("-password");
};
