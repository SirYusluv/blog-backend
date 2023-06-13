import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

app.use(express.json());

const errorHandler: ErrorRequestHandler = function (
  err: any,
  _: Request,
  res: Response,
  _1: NextFunction
) {
  const resMsg = {
    message: "Error processing your request, please try later.",
    status: 500,
  };
  res.status(500).json({
    message: "Error processing your request, please try later.",
    status: 500,
  });
};
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async function () {
  try {
    // mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Listenning on PORT: ${PORT}`);
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
});
