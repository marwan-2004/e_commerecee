import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { failedLogin, successLogin } from "./types/authInterface";
import { email } from './../node_modules/zod/v4/classic/schemas';
import session from './../node_modules/next-auth/core/routes/session.d';

export const authoptions:NextAuthOptions={
    pages:{
            signIn:'/login'
        } ,
    providers :[
        

        Credentials({
            name:'credentials',
            credentials:{
                email :{ },
                password:{ }
            } ,
            authorize: async (credentials)=>{
                //call api
                const response=await fetch(`${process.env.API}/auth/signin` , {
                    method:'POST',
                    body: JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    }) ,
                    headers: {
                        'content-type' : 'application/json'
                    }
                })

                const payload :failedLogin |successLogin = await response.json()

                    console.log(payload);
                    

                if('token' in payload){
                    return {
                    id:payload.user.email,
                    user:payload.user ,
                    token:payload.token
                }
                }else{
                    throw new Error('Error...')
                }
            }
        })
    ] ,
    callbacks:{
        jwt:({token,user})=>{
            if(user){
                token.user=user.user
            token.token=user.token
            }

            return token
            

        } ,
        session:({session,token})=>{
            session.user=token.user
            return session

        }
    }

}


//useSession 