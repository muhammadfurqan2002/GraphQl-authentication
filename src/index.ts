import express from 'express';

import {createGraphQlServer} from './graphql/index';
import {expressMiddleware} from '@apollo/server/express4';

async function init(){    

const app=express();
const Port=Number(process.env.PORT) || 8000;

app.use(express.json());

  app.get('/',(req,res)=>{
    return res.json({message:"Hlo From Thread App"});

  });
    
  app.use("/Graphql",expressMiddleware(await createGraphQlServer()));

    app.listen(Port,()=>console.log(`server started at post : ${Port} `));

}

init();