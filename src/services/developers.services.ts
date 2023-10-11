import format from "pg-format";
import { client } from "../database";
import { CreateDeveloper, DeveloperObj, DeveloperRead, DeveloperResult, DeveloperUpdate } from "../interfaces/developers.interface";

export const createDeveloperService = async(data: CreateDeveloper) => {
    const queryFormat : string  = format(`INSERT INTO developers (%I) VALUES (%L) RETURNING *`,
    Object.keys(data),
    Object.values(data)
    )

    const queryResult : DeveloperResult = await client.query(queryFormat)
    return queryResult.rows[0]
}

export const getDeveloperService = async(developerId: string ) =>  {
    const query: string = `
    SELECT 
     "d"."id" AS "developerId",
     "d"."name" AS "developerName",
     "d"."email" AS "developerEmail",
     "di"."developerSince" AS "developerInfoDeveloperSince",
     "di"."preferredOS" AS "developerInfoPreferredOS"
     FROM developers AS d
     LEFT JOIN "developerInfos" AS di
     ON "di"."developerId" = "d"."id"
     WHERE "d"."id" = $1;
    `
    const queryResult : DeveloperResult = await client.query(query, [developerId])
    return queryResult.rows[0] as DeveloperObj; 

} 

export const updateDeveloperService = async(developerId: string, data : DeveloperUpdate ) =>  {
    const queryFormat : string = format(`UPDATE developers SET (%I) = ROW (%L) WHERE id = $1 RETURNING *; `,
    Object.keys(data),
    Object.values(data)
    )
    const queryResult : DeveloperResult = await client.query(queryFormat, [developerId])
    return queryResult.rows[0]
}

export const deleteDeveloperService = async(developerId: string) => {
    const query : string = `DELETE FROM developers WHERE id = $1; `
    await client.query(query, [developerId])
}

export const createDeveloperInfoService = async (developerId: string, data : any ) =>  {
    const queryFormat : string = format(`INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;  `,
    Object.keys({...data, developerId}),
    Object.values({...data, developerId})
    )
    const queryResult : DeveloperResult = await client.query(queryFormat)
    return queryResult.rows[0]
}