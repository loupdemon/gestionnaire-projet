"use server"

import prisma from "@/lib/prisma"
import { randomBytes } from "crypto";

export async function checkAndAddUser(email: string, name: string){
    if(!email) return
    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!existingUser && name){
            await prisma.user.create({
                    data: {
                        email,
                        name
                    }
            })
               console.error("Erreur lors de la vérification de l'utilisateur : ");
            }
        else{
            console.error("Utilisateur déja présent dans la base de données");
        }
    }catch(error) {
        console.error("Erreur lors de la vérification de l'utilisateur : ", error);
    }
}

//generation code unique
function generateUniqueCode(): string {
    return randomBytes(6).toString('hex')
}

//pour créer un projet
export async function createProject(name: string, description: string, email: string) {
    try {

        const inviteCode = generateUniqueCode() //code généré à transmettre
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error('User not found');
        }

        const nouveauProject = await prisma.project.create({
            data: {
                name,
                description,
                inviteCode,
                createdById: user.id //l'utilisateur qui l'a crée le projet
            }
        })
        return nouveauProject;
    } catch (error) {
        console.error(error)
        throw new Error
    }
}

//récupération des projets créés par l'utilisateur
export async function getProjectsCreatedByUser(email: string) {
    try {

        const projects = await prisma.project.findMany({ //comme on cherche plusieur projets on mets many, si c'était un on mettrait findunique 
            where: {
                createdBy: { email }
            },
            include: {
                tasks: { // on cherche les tâches associés au projet
                    include: { // pour chaque tache on recupere l'utilisateur et proprietaire du projet
                        user: true,
                        createdBy: true
                    }
                },
                users: {//on récupere aussi la lsite de tous les utilisateurs associés à ce proejt
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        })

        const formattedProjects = projects.map((project) => ({
            ...project, //ajout de toutes les informations de projets
            users: project.users.map((userEntry) => userEntry.user) //liste des utilisateurs
        }))

        return formattedProjects

    } catch (error) {
        console.error(error)
        throw new Error
    }
}

//Suppression de projet
export async function deleteProjectById(projectId: string) {
    try {
        await prisma.project.delete({
            where: {
                id: projectId
            }
        })
        console.log(`Projet avec l'ID ${projectId} supprimé avec succès.`);
    } catch (error) {
        console.error(error)
        throw new Error
    }
}

//fonction d'ajout d'utilisateur dans un projet
export async function addUserToProject(email: string, inviteCode: string) {
    try{
        const project = await prisma.project.findUnique({
            where : {inviteCode}
        })
        if(!project){
            throw new Error("Projet non trouvé ! ")
        }
        const user = await prisma.user.findUnique({
            where : {email}
        })
        if(!user){
            throw new Error("Utilisateur non trouvé ! ")
        }

        const existingAssociation = await prisma.projectUser.findUnique({
            where : {
                userId_projectId : {
                    userId : user.id,
                    projectId: project.id
                }
            }
        })
        if(existingAssociation){
            throw new Error("Utilisateur déja associé à ce projet")
        }

        await prisma.projectUser.create({
            data : {
                userId : user.id,
                projectId : project.id
            }
        })

        return "Utilisater ajouté au projet avec Succès";
    } catch (error){
        console.error(error);
        throw new Error;
    }
}


export async function getProjectsAssociatedWithUser(email: string) {
    try {

        const projects = await prisma.project.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            email
                        }
                    }
                }
            },
            include: {
                tasks: true,
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            }
                        }
                    }
                }
            }

        })

        const formattedProjects = projects.map((project) => ({
            ...project,
            users: project.users.map((userEntry) => userEntry.user)
        }))

        return formattedProjects

    } catch (error) {
        console.error(error)
        throw new Error
    }
}