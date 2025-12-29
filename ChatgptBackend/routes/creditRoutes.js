import express from "express";
import { getPlans, purchasePlan } from "../controllers/creditController.js";
import { protect } from "../middlewares/auth.js";
const creditRouter = express.Router();

//Get all plans
creditRouter.get("/plans", getPlans);

//Purchase a plan
creditRouter.post("/purchase", protect, purchasePlan);

export default creditRouter;  