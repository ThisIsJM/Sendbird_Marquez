'use client'
import { AppUser } from '@/utils/appUserUtils'
import AddChannel from '@sendbird/uikit-react/ChannelList/components/AddChannel'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import UserProfileModal from './UserProfileModal'
interface Props{
    appUser: AppUser,
    setShowUserProfile: Dispatch<SetStateAction<boolean>>
}

export default function CustomHeader({appUser, setShowUserProfile}: Props) {

  return (
    <div className = "text-black flex flex-row h-full gap-x-2 w-full">
        <HeaderButton id={appUser.id} nickname={appUser.name} profileUrl={appUser.profileUrl} setShowUserProfile={setShowUserProfile}/>
        <div className='my-auto'>
            <AddChannel/>
        </div>
        
    </div>
  )
}

function HeaderButton({id, nickname, profileUrl, setShowUserProfile}: {id: string, nickname: string, profileUrl: string, setShowUserProfile: React.Dispatch<React.SetStateAction<boolean>>}){

    return(<div className="flex flex-row gap-x-2 text-sm w-64 h-12 m-2 font-medium rounded-[4px] overflow-hidden hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => {setShowUserProfile(prevState => !prevState)}}
            >
        <Image src={profileUrl} alt={'user profile'} height={25} width={100} className=' rounded-[50%] h-10 w-10'/>
        <div className="flex flex-col ">
            <p className="text-black font-semibold">{nickname}</p>
            <p className="text-gray-500 text-xs truncate">{id}</p>
        </div>
    </div>)
}


