
import {CreateUserPayLoad,User,generateUserToken} from '../../services/user_service';


const Queries={

    login:async(_:any,payload:generateUserToken)=>{

        const res=await User.generateToken(payload); 
        return res;
    }


}

const mutations={
    createUser:async(_:any,payload:CreateUserPayLoad)=>{

            const res=await User.CreateUser(payload); 
            return res.id;
    }

}

export const resolvers={
    Queries,mutations
};