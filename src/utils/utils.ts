import * as crypto from 'crypto';
export interface AppUser{

    id: string,
    name: string,
    profileUrl: string,
    deleted: boolean,
    dateCreated: Date,
}

export interface AppChannel{

    url: string,
    createdById: string,
    chatMateId: string,
    deleted: boolean,
    messageCount: number,
    dateCreated: Date
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