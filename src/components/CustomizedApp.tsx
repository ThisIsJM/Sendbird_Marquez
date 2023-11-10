"use client"
import { AppChannel, addChannelToDb } from '@/utils/appChannelUtils'
import { Channel, ChannelList } from '@sendbird/uikit-react'
import React, { useEffect, useState } from 'react'
import { ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context';
import CustomHeader from './CustomHeader';
import { AppUser } from '@/utils/appUserUtils';


export default function CustomizedApp({appUser, setShowUserProfile}: {appUser: AppUser, setShowUserProfile: any}) {

    const [currentChannel, setCurrentChannel] = useState<string>("")
    const [addedUser, setAddedUser] = useState<string>()

    function createChannel(users : string[]): any{

        if(users.length != 1 ) return;

        setAddedUser(users[0]);

        return{
            invitedUserIds: users
        }
    }
    useEffect(() => {

        //MAKES SURE TO ONLY RUN WHEN ADDED USER IS UPDATED OR NOT EMPTY
        if(!addedUser || !appUser) return

        const channel : AppChannel = {
            url: currentChannel,
            createdById: appUser.id,
            chatMateId: addedUser,
            deleted: false,
            messageCount: 0,
            dateCreated: new Date()
        }

        addChannelToDb(channel);
        setAddedUser('')
    },[currentChannel])

  return (
    <div className = "flex flex-row h-full">
        <div>
            <ChannelListProvider>
                <ChannelList
                    onChannelSelect={(channel) => {
                        setCurrentChannel(channel?.url?? "")
                    }}
                    allowProfileEdit={true}
                    renderHeader={() => <CustomHeader appUser={appUser} setShowUserProfile={setShowUserProfile}/>}
                    onBeforeCreateChannel={createChannel}
                />
            </ChannelListProvider>    
        </div>
        <Channel channelUrl={currentChannel}/>
    </div>
    
  )
}