import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

export interface AppUser{

    id: string,
    name: string,
    profileUrl: string,
    deleted: boolean,
    dateCreated: Date,
}

export async function saveAppUserToDb(appUser: AppUser){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: appUser.id,
            name: appUser.name,
            profileUrl: appUser.profileUrl,
            deleted: appUser.deleted,
            dateCreated: appUser.dateCreated
        })
    }

    const response = await fetch('/api/appuser/',options)
    const responseData = await response.json();
    console.log(responseData)

    if(responseData.token){
        //SAVE TOKEN TO COOKIES
        const cookies = new Cookies();
        cookies.set("jwt", responseData.token)
    }
}

export async function editAppUserToDb(id: string, name: string, profileUrl: string){

    const cookies = new Cookies()

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.get("jwt")}`
        },
        body: JSON.stringify({
            id: id,
            name: name,
            profileUrl: profileUrl,
        })
    }

    const response = await fetch('/api/appuser/',options)
    console.log(response)
}

//GENERATE RANDOM USER
export function generateAppUser(): AppUser{

    const appUser : AppUser = {
        id: uuidv4(),
        name: "John Doe",
        profileUrl: "https://source.unsplash.com/random/?city,night",
        deleted: false,
        dateCreated: new Date()
    }

    return appUser;
}