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
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { BlogRouter } from "./blog.router";

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

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.use(upload.single("file")); // to post images
app.use(BlogRouter);

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

// documentation setup
const swaggerOpt: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description:
        "A simple Blog API that can create, fetch, update and delete blog",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Olanrewaju Yusuf",
        url: "https://siryusluv.netlify.app",
        email: "olanrewajuyusuf379@gmail.com",
      },
    },
  },
  apis: ["./**/*.router.ts"],
};
const specs = swaggerJSDoc(swaggerOpt);
app.use("/api", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

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
