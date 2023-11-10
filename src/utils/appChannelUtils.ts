import Cookies from "universal-cookie"

export interface AppChannel{

    url: string,
    createdById: string,
    chatMateId: string,
    deleted: boolean,
    messageCount: number,
    dateCreated: Date
}


export const addChannelToDb = async(channel: AppChannel) => {

    const cookies = new Cookies()
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.get("jwt")}`
        },
        body: JSON.stringify({
            url: channel.url,
            createdById: channel.createdById,
            chatMateId: channel.chatMateId,
            deleted: channel.deleted,
            messageCount: channel.messageCount,
            dateCreated: channel.dateCreated
        })
    }

    const response = await fetch('/api/channel/', options)
    console.log(response)
}
