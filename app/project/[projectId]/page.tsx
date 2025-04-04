"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { Project } from "@/type";
import Link from "next/link";
import { getProjectInfo } from "../../actions";
import { toast } from "react-toastify";
import UserInfo from "@/app/components/UserInfo";
import ProjectComponent from "@/app/components/ProjectComponent";

const Page = ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress as string;
    const [projectId, setProjectId] = useState("");
    const [project, setProject] = useState<Project | null>(null);

    //fonction getall
    const fetchProject = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true);
            setProject(project);
        } catch (error) {
            console.error("Erreur lors du chargement du projet !", error);
            toast.error("Erreur lors du chargement du projet ! ");
        }
    };

    useEffect(() => {
        const getProjectId = async () => {
            const resolveParams = await params;
            setProjectId(resolveParams.projectId);
            fetchProject(resolveParams.projectId);
        };
        getProjectId();
    }, [params]);

    return (
        <Wrapper>
            <div className="md:flex md:flex-row flex-col">
                <div className="md:w-1/4">
                    <div className="p-5 border border-base-300 rounded-xl mb-6">
                        <UserInfo
                            role={"CRÉE PAR"}
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>

                    <div className="w-full">
                        {project && (
                            <ProjectComponent
                                project={project}
                                admin={0}
                                style={false}
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 md:ml-6 md:mt-0 md:w-3/4">
                    <div className="md:flex md:justify-between">
                        <Link href={`/new-task/${projectId}`}>
                            <button className="btn btn-primary mb-4">
                                Créer une tâche
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Page;
