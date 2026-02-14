import NextAuth, { DefaultSession ,User } from "next-auth"
import { UserResponse } from "./authInterface"
import { JWT } from "next-auth/jwt"
import { User } from './../../node_modules/next-auth/core/types.d';
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
 export interface User{
    user:UserResponse ,
    token:string 
  }
export  interface Session {
    user : UserResponse ,

    
  }
}





declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User{
    /** OpenID ID Token */
    idToken?: string
  }
}