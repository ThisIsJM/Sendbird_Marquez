'use client'
import SendbirdApp from "@sendbird/uikit-react/App";
import CustomizedApp from '@/components/CustomizedApp';
import { AppUser, generateAppUser } from '@/utils';
import { SendBirdProvider } from '@sendbird/uikit-react';
import { useEffect, useState } from 'react';

const appId: string = "8056AAA9-9594-4FE3-90AA-218173F46E42"

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