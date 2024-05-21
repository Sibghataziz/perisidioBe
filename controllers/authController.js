import UserServices from "../dbServices/userServices.js";
import AuthUtils from "../utils/authUtil.js";

async function registerUser(req, res) {
  try {
    const requestUser = req.body;
    if (requestUser.password !== requestUser.confirmPassword) {
      throw Error("password not matched");
    }
    if (
      !requestUser.firstName ||
      !requestUser.lastName ||
      !requestUser.email ||
      !requestUser.phoneNumber ||
      !requestUser.userType ||
      !requestUser.password
    ) {
      throw Error("required fields are empty");
    }
    await UserServices.insertUser(requestUser);
    return res.status(201).send({
      status: 1,
      message: "user successfully added",
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const requestUser = req.body;
    if (!requestUser.email || !requestUser.password) {
      throw Error("email and password required!!");
    }
    const user = await UserServices.findOneUserByQuery({
      email: requestUser.email,
    });
    if (!user) {
      throw Error("your are not registered with us!!");
    } else if (user.password !== requestUser.password) {
      throw Error("Not valid email password pair!!");
    }
    const token = AuthUtils.generateToken(user);
    return res.status(200).send({
      status: 1,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

async function getUser(req, res){
  try {
    const userId = req.params.userId;
    const user = await UserServices.findOneUserByQuery({ _id: userId })
    if(!user){
      throw Error("Invalid user")
    }
    return res.status(200).send({
      status: 1,
      data: user
    })
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

export default {
  registerUser,
  loginUser,
  getUser
};
