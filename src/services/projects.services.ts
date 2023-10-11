import format from "pg-format"
import { client } from "../database"
import { CreateProject, ProjectObj, ProjectRead, ProjectResult, ProjectUpdate } from "../interfaces/project.interface"

export const createProjectService = async(data: CreateProject) => {
    const queryFormat : string  = format(`INSERT INTO projects (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
    )

    const queryResult : ProjectResult = await client.query(queryFormat)
    return queryResult.rows[0]
}
export const getProjectService = async(projectId : string) => {
    const query: string = `SELECT
        "p"."id" AS "projectId",
        "p"."name" AS "projectName",
        "p"."description" AS "projectDescription",
        "p"."repository" AS "projectRepository",
        "p"."startDate" AS "projectStartDate",
        "p"."endDate" AS "projectEndDate",
        "d"."name" AS "projectDeveloperName"
        FROM projects AS p
        LEFT JOIN developers AS d
        ON "d"."id" = "p"."developerId"
        WHERE "p"."id" = $1;
    `
    const queryResult : ProjectResult = await client.query(query, [projectId])
    return queryResult.rows[0] as ProjectObj
}
export const updateProjectService = async(projectId: number, data: ProjectUpdate) => {
    const queryFormat : string = format(`UPDATE projects SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
    )
    const queryResult : ProjectResult = await client.query(queryFormat, [projectId])
    return queryResult.rows[0]

}
