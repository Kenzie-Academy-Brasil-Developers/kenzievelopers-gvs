import { Request, Response } from "express"
import { Project, ProjectObj, ProjectRead, ProjectUpdate } from "../interfaces/project.interface"
import { createProjectService, getProjectService, updateProjectService } from "../services/projects.services"

export const createProjectController = async (req : Request, res : Response) => {
    const project : Project = await createProjectService(req.body)
    return res.status(201).json(project)
}
export const getProjectController = async(req : Request, res : Response) => {
    const project : ProjectObj = await getProjectService(req.params.id)
    return res.status(200).json(project)
}
export const updateProjectController = async(req : Request, res : Response) => {
    const projectId = Number(req.params.id)
    const projectBody = req.body

    const project : Project = await updateProjectService(projectId, projectBody)
    return res.status(200).json(project)

}