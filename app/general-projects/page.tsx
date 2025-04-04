"use client"
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper';
import { SquarePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { addUserToProject, getProjectsAssociatedWithUser } from '../actions';
import { useUser } from '@clerk/nextjs';
import { Project } from '@/type';
import ProjectComponent from '../components/ProjectComponent';
import EmptyState from '../components/EmptyState';

const Page = () => {
    const {user} = useUser();
    const email = user?.primaryEmailAddress?.emailAddress as string;
    const [ inviteCode, setInviteCode] = useState("");
    const [ associatedProjet, setAssociatedProject] = useState<Project[]>([]);

    const fetchProjects = async(email : string) =>{
        try{
            const associatedProjet = await getProjectsAssociatedWithUser(email);
            setAssociatedProject(associatedProjet);
        }
        catch(error){
            toast.error("Erreur lors du chargement du projet ! ");
        }
    }

    useEffect(()=>{
        if(email){
            fetchProjects(email);
        }
    },[email])

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

            <div>
            {associatedProjet.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              { associatedProjet.map((projet)=>(
                <li key={projet.id}>
                   <ProjectComponent project={projet}  admin={1} style={true}/>                
                 </li>
              ))}
            </ul>

          ) : (
            <div>
              <EmptyState
                imageSrc="/projet_vide.png"
                imageAlt="image representant un projet vide"
                message="Aucun projet crée"
              />
            </div>
          )}
            </div>
        </Wrapper>
    )
}

export default Page;