'use client'
import SendbirdApp from "@sendbird/uikit-react/App";
import CustomizedApp from '@/components/CustomizedApp';
import { SendBirdProvider } from '@sendbird/uikit-react';
import { useEffect, useState } from 'react';
import { AppUser, editAppUserToDb, generateAppUser, saveAppUserToDb } from "@/utils/appUserUtils";
import UserProfileModal from "@/components/UserProfileModal";

const appId: string = "8056AAA9-9594-4FE3-90AA-218173F46E42"

export default function Home() {

    const [appUser, setAppUser] = useState<AppUser>(generateAppUser())
    const [theme, setTheme] = useState<"light" | "dark" | undefined>("light")

    const [showUserProfile, setShowUserProfile] = useState<boolean>(false)
    // useEffect(() => {
    //     saveAppUserToDb(appUser)
    // },[])

    useEffect(() => {
      editAppUserToDb(appUser.id, appUser.name, appUser.profileUrl)
    },[appUser])

  return (
    <div className="App">
    <SendBirdProvider appId={appId} userId={appUser.id} nickname={appUser.name} profileUrl={appUser.profileUrl} theme={theme}>
      <CustomizedApp appUser={appUser} setShowUserProfile={setShowUserProfile}/>
      <UserProfileModal appUser={appUser} setAppUser={setAppUser} setTheme={setTheme} showUserProfile={showUserProfile} setShowUserProfile={setShowUserProfile}/>
    </SendBirdProvider>
  </div>
    
  )
}