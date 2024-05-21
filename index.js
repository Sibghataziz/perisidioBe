import express from "express";
import cors from "cors";
import connection from "./Config/db.js";
import userRouter from './routers/auth.router.js';
import { assignAuth } from "./middleware/auth.middleware.js";
import flatRouter from "./routers/flat.router.js";
import morgan from "morgan";



const Port = 8080

const app = express();
app.use(express.json());
app.use(cors({
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  origin: true
}));
app.use(morgan('dev'))
app.get('/', (req,res)=>{
  return res.status(200).json({
    "message": "Thank you for visiting this website"
  });
})

app.use('/auth', userRouter);
app.use(assignAuth)
app.use('/flats', flatRouter)


app.listen(Port, () => {
  try {
    connection();
    console.log(`server is running at http://localhost:${Port}`);
  } catch (error) {
    
  }
});
 
