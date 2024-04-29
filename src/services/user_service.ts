import {randomBytes,createHmac} from 'node:crypto';
import jwt from 'jsonwebtoken';


const secretKey="97345@873@";


import { PrismaClient} from "@prisma/client";
const prismaClient=new PrismaClient();
export interface CreateUserPayLoad{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
export interface generateUserToken{
    email:string;
    password:string;
}





export class User{

    public static CreateUser(payload:CreateUserPayLoad) {
        const {firstName,lastName,email,password}=payload;

        const salt=randomBytes(32).toString("hex");
        const hashedPassword=createHmac("sha256",salt).update(password).digest("hex");

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                halt:salt,
                password:hashedPassword
            }
        });

    }

    private static findUser(email:string){
        const user=prismaClient.user.findUnique({where :{email}});
        return user;
    }

    private static generateHashed(password:string,salt:string){
        const hashedPassword=createHmac("sha256",salt).update(password).digest("hex");
        return hashedPassword;

    }

    public static async generateToken(payload:generateUserToken){
                const {email,password}=payload;
        
                const user=await User.findUser(email);

                if(!user) throw new Error("User Not Found");
                const salt=user.halt;
                const hash=User.generateHashed(password,salt!);

                if(user.password!==hash)throw new Error("Wrong Password");

                const token=jwt.sign({email:user.email,password:user.password},secretKey);

                return token;
            }
    
}
