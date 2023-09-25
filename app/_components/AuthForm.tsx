'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  email: z.string().min(1, '請輸入email'),
  password: z.string().min(1, '請輸入密碼'),
})
function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.status === 'authenticated') {
      // router.push('/administrator/cati/status')
      console.log('已登入')
    }
  }, [session?.status, router])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'mail@mail.com',
      password: 'password',
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (callback?.error) return console.error('身分驗證失敗')

      if (callback?.ok) {
        router.push('/todo')
      }
    } catch (err) {
      console.error('登入失敗')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[285px] w-[300px] flex-col justify-around rounded-3xl  p-4 bg-secondary/20"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  className=" bg-transparent"
                  autoComplete="name"
                  placeholder="輸入Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold">Password</FormLabel>
              <FormControl>
                <Input
                  className=" bg-transparent"
                  autoComplete="current-password"
                  type="password"
                  placeholder="輸入Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} variant="default" type="submit">
          登入
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
