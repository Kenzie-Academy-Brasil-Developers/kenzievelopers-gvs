import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../error/App.error";
import { DeveloperResult } from "../interfaces/developers.interface";

export const verifyInfoDevId = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    const {id} = req.params
    const queryResult : DeveloperResult = await client.query('SELECT * FROM "developerInfos" WHERE "developerId" = $1',[id])

    if(queryResult.rowCount){
        throw new AppError('Developer infos already exists.',409)
    }
   
    return next()

}
