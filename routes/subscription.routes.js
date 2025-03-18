import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubcription,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscription " })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get  subscription details" })
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscription " })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE  subscription " })
);

subscriptionRouter.get("/user/:id", authorize, getUserSubcription);

subscriptionRouter.put("/:id/user", (req, res) =>
  res.send({ title: "CANCEL  subscription" })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);

export default subscriptionRouter;
