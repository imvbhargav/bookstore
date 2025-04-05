import User from "../models/user.js";

async function createUser(email, hashedPassword, isAdmin = false) {
  const user = new User({email, password: hashedPassword, isAdmin});
  const createdUser = await user.save();
  return createdUser;
};

async function getUser(email) {
  const user = await User.findOne({ email });

  if (!user) {
    return { status: 404, message: "User not found!" };
  }

  return { status: 200, message: "User fetched successfully", user };
}

export { createUser, getUser };