import conn from '@/utils/db'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request){
    try{
        if(!conn) throw "Connection not available"

        const query = "INSERT INTO channels(url, createdbyid, chatmateid, deleted, messagecount, datecreated) VALUES($1, $2, $3, $4, $5, $6)"
        const {url, createdById, chatMateId, deleted, messageCount, dateCreated} = await req.json()
        const results = await conn.query(query, [url, createdById, chatMateId, deleted, messageCount, dateCreated])
        
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