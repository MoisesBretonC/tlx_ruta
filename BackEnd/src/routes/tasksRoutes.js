import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";
import { validateSchema }from '../middlewares/validatorMiddleware.js'
import { createTaskSchema } from "../schemas/taskSchema.js";
const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired,getTask);
router.post("/tasks", authRequired,validateSchema(createTaskSchema),createTasks);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired,updateTask);

export default router;
