import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <header className=" flex justify-between px-[200px] bg-slate-300 ">
      <Link href="/todo">home</Link>
      <Link href="/todo/add">add</Link>
    </header>
  )
}
