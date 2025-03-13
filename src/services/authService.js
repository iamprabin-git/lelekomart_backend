import User from "../models/User.js";

const login = async (data) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) throw new Error("User not found.");

  return user;
};

export default { login };
