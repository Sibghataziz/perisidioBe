import jwt from "jsonwebtoken";
import UserServices from "../dbServices/userServices.js";

const JWT_SECRET = process.env.JWT_SECRET;

const assignAuth = async (req, res, next) => {
  let token = req.headers.authorization || "";

  if (token) {
    try {
      const result = jwt.verify(token, JWT_SECRET);

      let user = await UserServices.findOneUserByQuery({ _id: result._id });
      user = user.toJSON();
      delete user.password;
      req.user = user;
    } catch (err) {
      console.log("Error in verifying the token", err);
    }
  }

  next();
};

export { assignAuth };
