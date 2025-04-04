import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient()
}

// on optimise le processus de connexion à la base de données , on utilise la pattern singleton
// qui permet d'avoir une seule instance, qui sera réutilsié plusieurs fois
// ça permet d'économiser les ressources
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma