import { Router } from "express";
import { createDeveloperController, createDeveloperInfoController, deleteDeveloperController, getDeveloperController, updateDeveloperController } from "../controllers/developers.controller";
import { verifyInfoDevId } from "../middlewares/verfifyInfoDevId.middleware";
import { verifyDeveloperId } from "../middlewares/verifyDeveloperId.middleware";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyOsValid } from "../middlewares/verifyOsValid.middleware";

export const developersRoutes : Router = Router()
developersRoutes.post('/', verifyEmail ,createDeveloperController)

developersRoutes.use('/:id', verifyDeveloperId) 
developersRoutes.get('/:id', getDeveloperController )
developersRoutes.patch('/:id', verifyEmail , updateDeveloperController)
developersRoutes.delete('/:id', deleteDeveloperController)
developersRoutes.post('/:id/infos',  verifyOsValid, verifyInfoDevId ,createDeveloperInfoController)


