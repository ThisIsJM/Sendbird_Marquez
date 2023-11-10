import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { AppUser } from "@/utils/appUserUtils";

interface Props{
    appUser: AppUser
    setAppUser: Dispatch<SetStateAction<AppUser>>
    setTheme: Dispatch<SetStateAction<"light" | "dark" | undefined>>
    showUserProfile: boolean
    setShowUserProfile: Dispatch<SetStateAction<boolean>>
}

export default function UserProfileModal({appUser, setAppUser, setTheme, showUserProfile, setShowUserProfile}: Props){
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    //PLACEHOLDER VALUE
    const [name, setName] = useState<string>(appUser.name)
    const [profileUrl, setProfileUrl] = useState<string>(appUser.profileUrl)

    useEffect(() => {
        setName(appUser.name)
        setProfileUrl(appUser.profileUrl)

    },[appUser])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            //setAppUser((prevState) => ({ ...prevState, profileUrl: fileUrl }));
            setProfileUrl(fileUrl)
        }
    };
    
    const uploadButtonHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const closeHandler = () =>{
        setShowUserProfile(false)
        setName(appUser.name)
        setProfileUrl(appUser.profileUrl)
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //UPDATE APP USERS
        setAppUser((prevState) => ({...prevState, profileUrl: profileUrl, name: name}))
        closeHandler()
    }

    return(<>
    <dialog id="my_modal_3" className= {`modal ${showUserProfile && 'modal-open'}`}>
        <form onSubmit={submitHandler} className="modal-box rounded-md text-black flex flex-col gap-y-5">
            <div>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-medium" type="button" onClick={closeHandler}>✕</button>
                <h3 className="font-bold text-lg">My Profile</h3>
            </div>
            
            {/* UPLOAD PROFILE */}
            <div className="form-control gap-y-2"> 
                <p className="text-sm">Profile Image</p>

                <div className="flex flex-row">
                    <Image src={profileUrl} alt={'user profile'} height={25} width={100} className=' rounded-[50%] h-24 w-24'/>
                    <input type="file" ref={fileInputRef} name="profileUrl" onChange={handleFileChange} className="btn btn-primary w-full max-w-xs hidden" />
                    <button onClick={uploadButtonHandler} type="button" className = "btn btn-md bg-white text-violet-800 text-base font-bold border-none my-auto mx-3">Upload</button>
                </div>
            </div>

            {/* NICKNAME */}
            <div className="form-control w-full gap-y-2 text-sm">
                <p>Nickname</p>
                <input type="text" placeholder="Enter your nickname" value={name} required onChange={(event) => {setName(event.target.value)}} className="input-sm p-5 text-base rounded-md input-bordered min-w-full border border-gray-300" />
            </div>

            {/* USER ID */}
            <div className="form-control w-full gap-y-2 text-sm">
                <p>User ID</p>
                <input type="text" placeholder="Type here" value={appUser.id} disabled={true} className="input-sm p-5 text-base rounded-md input-bordered min-w-full border border-gray-300 disabled:bg-gray-200" />
            </div>

            {/* THEME */}
            <div className="form-control w-full gap-y-2 text-sm">
                <p>Dark Theme</p>
                <input type="checkbox" className="toggle" onChange={() =>setTheme((prevState) => (prevState === "light" ? "dark" : "light"))} />
            </div>

            {/* BUTTONS */}
            <div className = "flex flex-row justify-end font-bold gap-x-2 text-sm">
                <button onClick={closeHandler} type="button" className="button border border-gray-300 rounded-md p-2 px-3">Cancel</button>
                <button className="button rounded-md p-2 bg-violet-600 text-white px-5">Save</button>
            </div>
        </form>
    </dialog>
    </>)
}