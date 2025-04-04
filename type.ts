import { Project as PrismaProject, Task  as  PrismaTask, User } from '@prisma/client';
// On renome projets qu'on a impoté de prisma en prismaProject puis on rajoute ces caractéristiques en bas
// On a crée ce modèle suplémentaire car on a rajoute de sinformations en plus, qu'on en prefere pas stoqué en BDD et qu'on doit calculé
// Fusion du type PrismaProject avec vos propriétés supplémentaires
export type Project = PrismaProject & { //on cancatène ce qu'on a avec ces informations
  totalTasks?: number;
  collaboratorsCount?: number;
  taskStats?: {
    toDo: number;
    inProgress: number;
    done: number;
  };
  percentages?: {
    progressPercentage: number;
    inProgressPercentage: number;
    toDoPercentage: number;
  };
  tasks?: Task[]; // Assurez-vous que la relation tasks est incluse
  users?: User[]; 
  createdBy?: User, 
};

export type Task = PrismaTask & {
  user?: User | null; 
  createdBy?: User | null ;
}