'use client'

import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function Navbar() {
  return (
    <header className=" flex justify-between py-2 px-[200px] bg-slate-300 ">
      <Link className={buttonVariants()} href="/todo">
        home
      </Link>
      <div className=" space-x-2">
        <Link className={buttonVariants()} href="/todo/add">
          add
        </Link>
        <Button variant="outline" onClick={() => signOut()}>
          登出
        </Button>
      </div>
    </header>
  )
}
