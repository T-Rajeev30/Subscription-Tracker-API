import mongoose from "mongoose";
import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  // implement signup logic here

  // what is req body ---> req.body is an object containing data from the client ( POST Request)'

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    // Hash password --=> Securing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    ///
    await session.commitTransaction();

    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  // implement signin logic here

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "User signed in SuccessFully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
