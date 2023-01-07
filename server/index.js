import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer"
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import path from "path"

import { fileURLToPath } from "url"
import { register } from "./controllers/auth.js"
import { verifiedToken } from "./middleware/auth.js"
import { createPost } from "./controller/posts.js"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"

//Basic Config
const filename = fileURLToPath(import.meta.url); 
const dirname = path.dirname(filename);
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(dirname, 'public/assets')))

dotenv.config()

//Save files with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination folder
    cb(null, "public/assets");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); 
  }
})
const upload = multer({ storage });

//Route w/ File
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifiedToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Mongoose Config
const PORT = process.env.PORT || 8001;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewURLParser: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((err) => console.log(`${err} No Connection`))