'use client'
import SendbirdApp from "@sendbird/uikit-react/App";
import CustomizedApp from '@/components/CustomizedApp';
import { AppUser, generateAppUser } from '@/utils/utils';
import { SendBirdProvider } from '@sendbird/uikit-react';
import { useEffect, useState } from 'react';

const appId: string = process.env.DEV_APP_ID ?? ''

export default function Home() {

    const [appUser, setAppuser] = useState<AppUser>(generateAppUser())

  return (
    <div className="App">
    <SendBirdProvider appId={appId} userId={appUser.id} nickname={appUser.name} profileUrl={appUser.profileUrl} allowProfileEdit={true}  >
      <CustomizedApp userId={appUser.id}/>
    </SendBirdProvider>
  </div>
    
  )
}


//     <SendbirdApp 
//     appId={appId} 
//     userId={appUser.id} 
//     nickname= {appUser.name}
//     profileUrl={appUser.profileUrl}
//     allowProfileEdit = {true}
    
// />