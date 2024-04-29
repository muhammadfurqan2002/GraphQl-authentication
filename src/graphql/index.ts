import {ApolloServer} from '@apollo/server';

import { User } from "./USER/index";


               
export async function createGraphQlServer() {
    
    const server=new ApolloServer({
        typeDefs:`
            type Query{

                ${User.Queries}

            }
            
            type Mutation{            
                ${User.mutations}
            }
        `,
        resolvers:{

            Query:{
                ...User.resolvers.Queries    
            },

            Mutation:{
                ...User.resolvers.mutations    
            } 
        }
        
    });

    await  server.start();

    return server;

}

module.exports={
    createGraphQlServer
}