import { Router } from "express";
const urlRouter = Router();
import { createURL, getURLs} from "../controllers/URL.js";

urlRouter.post("/createURL", createURL);
urlRouter.get("/getURLs", getURLs);

export default urlRouter;
