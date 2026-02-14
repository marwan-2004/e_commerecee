import * as zod from "zod"




export  const loginSchema=zod.object({
 
  email:zod.string().nonempty('Email is required')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email is not valid'),

  password:zod.string().nonempty('password in required')
  .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,'Password is not valid'),

 
 
  
 

})