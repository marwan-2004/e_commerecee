'use client'
import * as zod from "zod"
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schema/registerSchema'
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast' // You'll need to install this: npm install react-hot-toast

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  async function submitForm(values: zod.infer<typeof schema>) {
    setIsLoading(true)
    
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const payload = await response.json()
      console.log('API Response:', payload)

      if (response.ok && payload.message === 'success') {
        toast.success('Registration successful! Please login.')
        router.push('/login')
      } else {
        // Handle API validation errors
        if (payload.errors) {
          // If API returns field-specific errors
          Object.keys(payload.errors).forEach(key => {
            form.setError(key as any, {
              type: 'manual',
              message: payload.errors[key]
            })
          })
          toast.error('Please check the form for errors')
        } else {
          // General error message
          toast.error(payload.message || 'Registration failed')
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-1/2 mt-10 rounded-2xl mx-auto p-10 bg-gray-200">
      <h2 className='text-green-600 font-bold text-2xl'>Register Now</h2>
      
      <form onSubmit={form.handleSubmit(submitForm)}>
        {/* Name Field */}
        <div className="mt-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name :</FieldLabel>
                <Input
                  className='bg-white'
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Email Field */}
        <div className="mt-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                <Input
                  className='bg-white'
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Password Field */}
        <div className="mt-4">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                <Input
                  className='bg-white'
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mt-4">
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password :</FieldLabel>
                <Input
                  className='bg-white'
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Phone Field */}
        <div className="mt-4">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
                <Input
                  className='bg-white'
                  {...field}
                  id={field.name}
                  type="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your phone number"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className='my-5 w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}