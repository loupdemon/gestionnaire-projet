"use client"
import { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper"
import { FolderGit2 } from "lucide-react";
import { createProject, getProjectsCreatedByUser, deleteProjectById } from "./actions";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { Project } from "@/type";
import ProjectComponent from "./components/ProjectComponent";

export default function Home() {

  const {user} = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [ name, setName] = useState("");
  const [ description, setDescription ] = useState("");
  const [projets, setProjets] = useState<Project[]>([])

  const fetchProjects = async (email: string)=>{
    try{
      const myproject = await getProjectsCreatedByUser(email);
      setProjets(myproject); 
    }
    catch(error){
      console.error('Erreur lors du chargement des projets : ', error);
    }
  }

  //supression de projet
  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId)
      fetchProjects(email)
      toast.success('⛔️Project supprimé !')
    } catch (error) {
      throw new Error('Error deleting project: ' + error);
    }
  }

  //fonction d'envoie assynchrone
  const handleSubmit = async()=>{
    try{
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
        const projet = await createProject(name, description, email);
        if(modal){
          modal.close();
        }
        setName("");
        setDescription('');
        fetchProjects(email);
        toast.success("🍃Projet cré avec succès")

    } catch(error){
        console.error('Erreur lors de création de projet :/ ');
    }
  }

  useEffect(()=>{
    if(email){
      fetchProjects(email)
    }
  },[email])
  return (
    <Wrapper>
      <div>
        <button className="btn btn-primary mb-6" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>Nouveau Projet <FolderGit2/></button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Vous êtes sur le point de créer un New Project!</h3>
            <p className="py-4">N'oubliez pas de mettre une description 🐼</p>
            <div>
              <input
                placeholder="Nom du projet"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="border border-base-300 input input-bordered w-full mb-4 placeholder:text-sm"
                required
              />
              <textarea
                placeholder="Déscription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-base-300 w-full mb-2 placeholder:text-sm resize-none p-2 rounded-md"
                rows={4}
                required
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Créer <FolderGit2/>
              </button>
            </div>
          </div>
        </dialog>

        <div className="w-full">
          {projets.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              { projets.map((projet)=>(
                <li key={projet.id}>
                   <ProjectComponent project={projet}  admin={1} style={true} onDelete={deleteProject}/>                
                 </li>
              ))}
            </ul>

          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
