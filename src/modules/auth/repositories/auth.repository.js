import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const createUser = async (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return User.findById(userId);
};

export const findByUserIdAndUpdate = async (userId, payload) => {
  return User.findByIdAndUpdate(userId, payload, { new: true });
};
