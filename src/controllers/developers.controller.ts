import { Request, Response } from "express";
import { client } from "../database";
import { Developer, DeveloperObj, DeveloperRead } from "../interfaces/developers.interface";
import { createDeveloperInfoService, createDeveloperService, deleteDeveloperService, getDeveloperService, updateDeveloperService } from "../services/developers.services";

export const createDeveloperController = async (req : Request, res : Response) => {
    const developer : Developer = await createDeveloperService(req.body)
    return res.status(201).json(developer)
}

export const getDeveloperController = async (req : Request, res : Response) => {
    const developerId = req.params.id   
    const developer : DeveloperObj = await getDeveloperService(developerId);
    
    return res.status(200).json(developer)
}

export const updateDeveloperController = async(req:Request , res: Response) => {
    const developerId = req.params.id
    const developerBody = req.body

    const developer : Developer = await updateDeveloperService(developerId, developerBody)
    return res.status(200).json(developer)
}

export const deleteDeveloperController = async(req:Request , res: Response) => {
    const developerId = req.params.id
    await deleteDeveloperService(developerId)
    return res.status(204).json()
}

export const createDeveloperInfoController = async (req : Request, res : Response) => {
    const developerId = req.params.id
    const developerBody = req.body
    const developer : Developer = await createDeveloperInfoService(developerId, developerBody)
    return res.status(201).json(developer)

}