### prisma 
création prisma après installation 
npm i prisma
Puis npx prisma init --datasource-provider postgresql ou sqlite au choix 

puis dans schema.prisma on met nos modeles de donénes 

puis dans .env on rajout l'url de db


on migre le schema de prisma avec commande 
npx prisma migrate dev --name add_models 

### postgresql 
#### stallation 
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

#### usage d'abord avec authentification à la bdd 
If PostgreSQL is running, open a terminal and enter the PostgreSQL interactive shell:

sudo -u postgres psql
---
Now, create the user and database:

sql
CREATE USER johndoe WITH PASSWORD 'randompassword';
CREATE DATABASE mydb;
GRANT ALL PRIVILEGES ON DATABASE mydb TO johndoe;
---
Then, connect to your database:

psql -U johndoe -d mydb -h localhost -p 5432
---
Dans .env : postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public

--- 
#### pour egnerer les tables de nos modeles  
npx prisma generate 

#### Pour voir nos table et interagir 
npx prisma studio 

### on crée lib avec prisma.ts  , un fichier qui permet de se connecter à la base de données 
