import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../error/App.error";
import { Project, ProjectResult } from "../interfaces/project.interface";

export const verifyProjectId = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    const {id} = req.params
    console.log(id);
    
    const queryResult : ProjectResult = await client.query('SELECT * FROM projects WHERE id = $1;',[id])
    console.log(queryResult);
    
    if(!queryResult.rowCount){
        throw new AppError('Project not found.',404)
    }
    const foundProject : Project= queryResult.rows[0]
    res.locals = {...res.locals, foundProject}

    return next()
}