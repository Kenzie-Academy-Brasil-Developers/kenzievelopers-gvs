import { QueryResult } from "pg"

export type Project = {
    id: number,
    name:string,
    description : string,
    repository: number,
    startDate: Date | string,
    endDate?: Date | string,
    developerId? : number

}
export type ProjectResult = QueryResult<Project>
export type CreateProject = Omit<Project, "id">
export type ProjectUpdate = Partial<Project>
export type ProjectRead = Project[]
export type ProjectObj = Project