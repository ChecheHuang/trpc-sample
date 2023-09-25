'use client'

import Link from 'next/link'
import AuthForm from './_components/AuthForm'

function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <AuthForm />
    </div>
  )
}

export default Home
