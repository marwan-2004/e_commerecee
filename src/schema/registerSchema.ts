import * as zod from "zod"




export  const schema=zod.object({
  name:zod.string().nonempty('Name is required')
  .min(3,'Name min 3 char').max(10,'Name max 10 char'),

  email:zod.string().nonempty('Email is required')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email is not valid'),

  password:zod.string().nonempty('password in required')
  .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,'Password is not valid'),

  rePassword:zod.string().nonempty('rePassword is required') ,

  phone:zod.string().nonempty('phone in required').regex(/^01[01250[0-9]{9}$/, 'phone is not valid',)


  
 

}).refine((data)=>data.password === data.rePassword ,
 {path:['rePassword'],message:'Invalid RePassword '} )