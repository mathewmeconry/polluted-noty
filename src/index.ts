import dotenv from "dotenv";
dotenv.config();

import DB from "./modules/db";
import Express, {Router} from "express";
import UserController from "./controllers/user";
import AuthenticationController from "./controllers/authentication";
import cookieParser from "cookie-parser";
import NoteController from "./controllers/note";
import session from "express-session";
import Note from "./models/note";
import User from "./models/user";

async function main() {
  await DB.init(
    process.env.DB_HOST || "localhost",
    process.env.DB_PORT || "5432",
    process.env.DB_NAME || "noty",
    process.env.DB_USER || "postgres",
    process.env.DB_PASS || "postgres"
  );

  const app = Express();

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "NotSooooSecret",
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false},
    })
  );

  const apiRouter = Router();
  app.use(Express.json());
  app.use(cookieParser());

  new AuthenticationController(apiRouter);
  new UserController(apiRouter);
  new NoteController(apiRouter);
  app.use("/api", apiRouter);

  app.use(Express.static("frontend/build/"));
  app.use("/*", Express.static("frontend/build/"));
  app.set("trust proxy", 1); // trust first proxy

 await User.upsert({
  id: 1337,
  username: 'Santa',
  password: 'a383231f7f1c3c03e349f918486e45d6ea4ed0be37c4c2117b8f9818698bdefb6fb030c6dbee81b575d10369b8ca5356aa366a0ec07760ff775d1b3b9f3c8f0e'
 })

  await Note.upsert(
    {
      id: 1337,
      note: process.env.FLAG || 'HV22{P0luT1on_1S_B4d_3vERyWhere}',
      userId: 1337,
    }
  )

  app.listen(process.env.PORT || "8080", () => {
    console.log(`Server listening on ${process.env.PORT || "8080"}`);
  });
}

main();
