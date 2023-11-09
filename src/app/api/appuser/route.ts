import conn from '@/utils/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request){
    try{
        if(!conn) throw "Connection not available"

        const query = "INSERT INTO appUsers(userid, name, profileurl, deleted, dateCreated) VALUES($1, $2, $3, $4, $5)"
        const {id, name, profileUrl, deleted, dateCreated} = await req.json()
        const results = await conn.query(query, [id, name, profileUrl, deleted, dateCreated])
        
        if(results.rowCount && results.rowCount > 0){
            return NextResponse.json("Added succesfully")
        }
        else{
            throw "Query results are empty"
        }
    }
    catch(error){
        return NextResponse.json(error)
    }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try{
//             if(!conn) throw "Connection not available"

//             const query = "INSERT INTO appUsers(userid, name, profileurl, deleted, dateCreated) VALUES($1, $2, $3, $4, $5)"
//             const {id, name, profileUrl, deleted, dateCreated} = req.body
//             const results = await conn.query(query, [id, name, profileUrl, deleted, dateCreated])
            
//             if(results.rowCount && results.rowCount > 0){
//                 return res.status(200)
//             }
//             else{
//                 throw "Query results are empty"
//             }
//         }
//         catch(error){
//             res.status(400).json(error)
//         }
//     }

//     if(req.method === 'PUT'){
//         try{
//             if(!conn) throw "Connection not available"

//             const query = "UPDATE appUsers SET name = $1, profileUrl = $2 WHERE userid = $3"
//             const {id, name, profileUrl} = req.body
//             const results = await conn.query(query, [name, profileUrl, id])
            
//             if(results.rowCount && results.rowCount > 0){
//                 return res.status(200)
//             }
//             else{
//                 throw "Query results are empty"
//             }
//         }
//         catch(error){
//             res.status(400).json(error)
//         }
//     }
// }