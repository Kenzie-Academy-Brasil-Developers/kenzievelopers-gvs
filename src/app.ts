import 'express-async-errors'
import "dotenv/config";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleError.middleware";
import { developersRoutes } from "./routes/developer.route";
import { projectsRoutes } from './routes/projects.route';


const app: Application = express();
app.use(express.json())
app.use('/developers', developersRoutes)
app.use('/projects', projectsRoutes)

app.use(handleErrors)
export default app;
