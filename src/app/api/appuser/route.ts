import { generateToken, verifyToken } from '@/utils/authUtils'
import conn from '@/utils/db'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request){
    try{
        if(!conn) throw "Connection not available"

        const query = "INSERT INTO appUsers(userid, name, profileurl, deleted, dateCreated) VALUES($1, $2, $3, $4, $5)"
        const {id, name, profileUrl, deleted, dateCreated} = await req.json()

        const token = generateToken(id)
        if(!token.success) return NextResponse.json({message: token.id})

        const results = await conn.query(query, [id, name, profileUrl, deleted, dateCreated])
        
        if(results.rowCount !== null && results.rowCount > 0){
            const response = {message: "Added user succesfully", token: token.id}
            return NextResponse.json(response);

        }
        else{
            throw "Query results are empty"
        }    
    }
    catch(error){
        return NextResponse.json(error)
    }
}

export async function PUT(req: Request){
    try{
        if(!conn) throw "Connection not available"

        const authValue = req.headers.get("Authorization");

        if(!authValue)throw "Token does not exist"

        const token = authValue.replace('Bearer ', '');
        const decoded = verifyToken(token);

        if(!decoded.success) throw decoded

        const query = "UPDATE appUsers SET name = $1, profileUrl = $2 WHERE userid = $3"
        const {id, name, profileUrl} = await req.json()
        const results = await conn.query(query, [name, profileUrl, id])
        
        if(results.rowCount && results.rowCount > 0){
            return NextResponse.json("Updated succesfully")
        }
        else{
            throw "No changes were made"
        }
    }
    catch(error){
        return NextResponse.json(error)
    }
}