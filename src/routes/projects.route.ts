import { Router } from "express";
import { createProjectController, getProjectController, updateProjectController } from "../controllers/projects.controller";
import { verifyDeveloper } from "../middlewares/verifyDeveloper.middleware";
import { verifyProjectId } from "../middlewares/verifyProjectId.middleware";
import { verifyProjectDevId } from "../middlewares/verifyProjectsDevId.middleware";


export const projectsRoutes : Router = Router()
projectsRoutes.use('/:id', verifyProjectId)
projectsRoutes.post('/', verifyDeveloper ,createProjectController)
projectsRoutes.get('/:id', getProjectController)
projectsRoutes.patch('/:id', verifyProjectDevId ,updateProjectController)