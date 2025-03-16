import User from "../models/User.js";
import bcrypt from "bcryptjs";

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found.",
    };
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch) {
    throw {
      statusCode: 400,
      message: "Incorrect email or password.",
    };
  }

  return user;
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (user) {
    throw {
      statusCode: 409,
      message: "User already exists.",
    };
  }

  const hashedPassword = bcrypt.hashSync(data.password);

  return await User.create({
    address: data.address,
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: hashedPassword,
  });
};

export default { login, register };
