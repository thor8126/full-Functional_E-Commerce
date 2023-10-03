import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
export const registerControler = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validation
    // check if any required field is missing
    for (let key of [name, email, password, phone, address]) {
      if (!key) {
        // throw an error with a custom message
        return res.send({ error: `${key} is required` });
      }
    }

    // here we will check if same user is present in data base
    const existingUser = await userModel.findOne({ email });
    // if user is presend we will send a msg that user already exist
    if (existingUser) {
      return res.status(200).send({
        success: true,
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
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error: error.message,
    });
  }
};
