"use client"
import { AppChannel } from '@/utils'
import { Channel, ChannelList } from '@sendbird/uikit-react'
import React, { useEffect, useState } from 'react'

export default function CustomizedApp({userId}: {userId: string}) {

    const [currentChannel, setCurrentChannel] = useState<string>("")
    const [addedUser, setAddedUser] = useState<string>()

    function createChannel(users : string[]): any{

        if(users.length != 1 ) return;

        setAddedUser(users[0]);

        return{
            invitedUserIds: users
        }
    }

    function updateUser(user: any){
        
    }

    useEffect(() => {

        //MAKES SURE TO ONLY RUN WHEN ADDED USER IS UPDATED OR NOT EMPTY
        if(!addedUser || !userId) return

        const channel : AppChannel = {
            url: currentChannel,
            createdById: userId,
            chatMateId: addedUser,
            deleted: false,
            messageCount: 0,
            dateCreated: new Date()
        }

        setAddedUser('')
    },[currentChannel])

  return (
    <div className = "flex flex-row h-full">
        <div>
            <ChannelList
                onChannelSelect={(channel) => {
                    setCurrentChannel(channel?.url?? "")
                }}
                onBeforeCreateChannel={createChannel}
                onProfileEditSuccess={updateUser}
            />
        </div>
        <Channel channelUrl={currentChannel}/>
    </div>
    
  )
}