"use client"
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper';
import { SquarePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { addUserToProject } from '../actions';
import { EmailAddress } from '@clerk/nextjs/server';
import { useUser } from '@clerk/nextjs';

const Page = () => {
    const {user} = useUser();
    const email = user?.primaryEmailAddress?.emailAddress as string;
    const [ inviteCode, setInviteCode] = useState("");

    const handleSubmit = async () =>{
        try{
            if(inviteCode != ""){
                await addUserToProject(email, inviteCode)
                toast.success("🥑Vous pouvez maintenant collaborer à ce projet, Bravo!!!")
            }
            else toast.error("Aucun code 'na été fourni");
        } catch(error){
            toast.error("Code Invalide ou Vous appartenez déja au projet")
        }
    }

  return (
        <Wrapper>
            <div className='flex'>
                <div className='mb-4'>
                    <input 
                        type='text'
                        value={inviteCode}
                        onChange={(e)=>setInviteCode(e.target.value)}
                        placeholder="Code d'invitation"
                        className='w-full p-2 input input-bordered'
                    />
                </div>
                <button className='btn btn-primary ml-4' onClick={handleSubmit}>
                    Rejoindre <SquarePlus className='w-4 '/>
                </button>
            </div>
        </Wrapper>
    )
}

export default Page;