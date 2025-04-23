import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";
import morganMiddleware from "./logger/morgan.logger.js";
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger-output.json' assert {type:'json'};
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import YAML from "yaml";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(
  file?.replace(
    "- url: ${{server}}",
    `- url: ${process.env.CLIENTAPP_HOST_URL || "http://localhost:5500"}/api/v1`
  )
);

const app = express();

//loger
app.use(morganMiddleware);

const corsOptions = {
  origin: [process.env.LOCALHOST_URL, process.env.LOCALHOST_URL1, process.env.FRONTEND_URL, process.env.FRONTEND_URL1, process.env.FRONTEND_URL2], // Allows all origins
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  credentials: true, // Allows cookies and other credentials to be sent with the request
};



app.use(cors(corsOptions)); // Enable CORS for all origins

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
      extended: true,
  })
)

app.use(cookieParser());

// Importing & using Routes
import DoctorRouter from "./router/doctorRoutes.js";
import AppointmentRouter from "./router/appointmentRoutes.js";


app.use("/api/v1", DoctorRouter);
app.use("/api/v1", AppointmentRouter);




// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none", // keep all the sections collapsed by default
    },
    customSiteTitle: "Hospital API docs",
  })
);
export default app;

app.use(ErrorMiddleware);