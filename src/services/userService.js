import User from "../models/User.js";

const createUser = async (data) => {
  const user = await User.create(data);
  // await User.syncIndexes();

  return user;
};

export default { createUser };
