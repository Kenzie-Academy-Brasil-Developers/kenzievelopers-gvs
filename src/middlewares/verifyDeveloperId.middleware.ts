import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../error/App.error";
import { Developer, DeveloperResult } from "../interfaces/developers.interface";

export const verifyDeveloperId = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    const {id} = req.params
    const queryResult : DeveloperResult = await client.query('SELECT * FROM developers WHERE id = $1',[id])

    if(!queryResult.rowCount){
        throw new AppError('Developer not found.',404)
    }
    const foundDeveloper : Developer = queryResult.rows[0]
    res.locals = {...res.locals, foundDeveloper}

    return next()
}