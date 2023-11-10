import * as crypto from 'crypto';

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
    console.log(response)
}

export async function editAppUserToDb(id: string, name: string, profileUrl: string){
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
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
        id: generateRandomUserId(),
        name: "John Doe",
        profileUrl: "https://source.unsplash.com/random/?city,night",
        deleted: false,
        dateCreated: new Date()
    }

    return appUser;
}

export function generateRandomUserId(): string {
    
    const length = 10
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userId = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userId += characters[randomIndex];
    }
    return hashUserId(userId);
}

function hashUserId(userId: string): string {
  const hmac = crypto.createHmac('sha256', process.env.DEV_USER_ID_KEY ?? '');
  hmac.update(userId);
  return hmac.digest('hex');
}