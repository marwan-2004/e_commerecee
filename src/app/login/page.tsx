'use client'
import * as zod from "zod"
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { log } from 'console';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './../../schema/loginSchema';
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useSearchParams, useRouter } from "next/navigation"


export default function Login() {
  const router =  useRouter()
  const searchParams =useSearchParams()
  const callbackUrl=searchParams.get('callbackUrl')
  const [isLoading, setisLoading] = useState(false)

 const form= useForm({
  defaultValues:{
    email:'',
    password:'',
    
    
  } ,
  resolver:zodResolver(loginSchema) ,
  mode:'onBlur'

 })

 async function  submitForm(values:zod.infer<typeof loginSchema>){
  setisLoading(true)
  console.log(values);
 const response=await signIn('credentials',{
    email :values.email ,
    password:values.password ,
    callbackUrl:callbackUrl ??'/' ,
    redirect:false
  })
  console.log(response);
  if(response?.ok){
    //home
    toast.success('successfully logged in')
    router.push(response.url || '/')


  }else{
    toast.error('Error logging in')

  }
  
  setisLoading(false)

 }
  return <>
  
  
  
  <div className="w-1/2 mt-10 rounded-2xl mx-auto p-10 bg-gray-200">
  <h2 className='text-green-600 font-bold text-2xl'>Login now</h2>
  <form onSubmit={form.handleSubmit(submitForm)} >

 
  <div className="mt-4">
    <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email : </FieldLabel>
      <Input
      className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your email"
        
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
  </div>
  <div className="mt-4">
    <Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password : </FieldLabel>
      <Input type="password"
      className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your password"
        
      />
      
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
  </div>
  

<Button disabled={isLoading} type="submit" className='my-5 w-full'>
  {isLoading?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>  :'Submit'}
  

  
</Button>


  </form>
    </div>
  </>
}
