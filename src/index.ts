import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const ALLOWED_IMAGES = ["image/jpeg", "image/png"];
const FILE_SIZE_LIMIT = 1024 * 200; // 200kb

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

const storage = multer.diskStorage({
  destination: function (_, _1, cb) {
    cb(null, PUBLIC_DIR);
  },

  filename: function (_, file, cb) {
    const fileExt = path.extname(file.originalname);
    cb(null, `${file.originalname}${uuid()}${fileExt}`);
  },
});

const imageFilter = function (
  _: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (ALLOWED_IMAGES.includes(file.mimetype)) cb(null, true);
  else cb(new Error("provided file not supported"));
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
});

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

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
