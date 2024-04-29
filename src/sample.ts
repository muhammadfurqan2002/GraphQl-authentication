import express from 'express';
import { PrismaClient} from "@prisma/client"
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

const prismaClient=new PrismaClient();
               

async function init(){    

const app=express();
const Port=Number(process.env.PORT) || 8000;

app.use(express.json());

const server=new ApolloServer({
        typeDefs:`
            type Query{
                hello:String
            }
           type Mutation{
                createUser(first_name:String!,last_name:String!,email:String!,password:String!):String
           }
        `,
        resolvers:{
            Mutation:{
                createUser:async(_,
                    {firstName,lastName,email,password}
                    :{firstName:string,lastName:string,email:string,password:string})=>{
                        await prismaClient.user.create({
                            data:{
                                firstName,
                                lastName,
                                password,
                                email
                            }
                        });

                        return "User Created";

                } 
            }
        }
    });

  await  server.start();

  app.get('/',(req,res)=>{
    return res.json({message:"Hlo From Thread App"});

  });
    
  app.use("/Graphql",expressMiddleware(server));

    app.listen(Port,()=>console.log(`server started at post : ${Port} `));

}

init();