import { Router } from "express";
import dbController from "../controllers/db.controller";

const router = Router();

router.post("/", dbController.connectDb);
router.get("/", dbController.getAllDb);
router.get("/:name", dbController.setDatabase);
router.post("/:name/query", dbController.getQuery);
router.get("/:database/:table", dbController.getTable);
router.delete("/:database/:table", dbController.deletTable);

export default router;
