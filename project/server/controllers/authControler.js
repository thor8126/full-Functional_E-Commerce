import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWt from "jsonwebtoken";

export const registerControler = async (req, res) => {
  try {
    const { name, email, password, answer, phone, address } = req.body;
    // validation
    // check if any required field is missing
    let keys = ["name", "email", "password", "phone", "address", "answer"];
    [name, email, password, phone, address, answer].forEach((key, i) => {
      if (!key) {
        return res.status(404).send({ message: `${keys[i]} is required` });
      }
    });

    // here we will check if same user is present in data base
    const existingUser = await userModel.findOne({ email });
    // if user is presend we will send a msg that user already exist
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Reagisterd Please Login",
      });
    }
    // here we will user registerd
    // here we are sending password to convert in hashPassword
    const hashedPassword = await hashPassword(password);
    // save
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });
    // try to save the user
    const saved = await newUser.save();
    if (!saved) {
      // handle the error
      return res.status(200).send({
        success: true,
        message: error.message,
      }); // this will print "Please enter ur password"
    } else {
      // success
      const { name, email, phone, address, ...rest } = saved;
      return res.status(201).send({
        success: true,
        message: "User saved successfully",
        user: { name, email, phone, address },
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error: error.message,
    });
  }
};

// login
export const loginControler = async (req, res) => {
  const { email, password } = req.body;
  try {
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email & password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registerd",
      });
    }
    // here we are comapring the password
    const decryptPassword = await comparePassword(password, user.password);
    if (!decryptPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // crteate token
    const token = JWt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { name, phone, address, role, ...rest } = user;
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: { name, phone, address, email, role },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

// test routes
export const testController = (req, res) => {
  res.status(200).send({ yes: "Success fully working" });
};

// forgotPasswordControler
export const forgotPasswordControler = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    // here i am checking if any field is required
    let keys = ["email", "answer", "newPassword"];
    [email, answer, newPassword].forEach((key, i) => {
      if (!key) {
        return res.status(400).send({ message: `${keys[i]} is required` });
      }
    });
    // check email
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    // here we are converting password into hashPassword
    const updatePassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: updatePassword });
    return res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
