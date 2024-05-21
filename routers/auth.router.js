
import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { assignAuth } from '../middleware/auth.middleware.js';

const userRouter = Router()

userRouter.post('/login', AuthController.loginUser)
userRouter.post('/register', AuthController.registerUser)


// userRouter.use(assignAuth)
userRouter.get('/:userId', AuthController.getUser)

export default userRouter