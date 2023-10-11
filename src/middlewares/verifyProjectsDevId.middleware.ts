import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../error/App.error";
import { Project, ProjectResult } from "../interfaces/project.interface";

export const verifyProjectDevId = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    const {developerId} = req.body
    const queryResult : ProjectResult = await client.query('SELECT * FROM projects WHERE "developerId" = $1',[developerId])
    console.log(developerId);
    
    if(!queryResult.rowCount){
        throw new AppError('Developer not found.',404)
    }
   

    return next()
}