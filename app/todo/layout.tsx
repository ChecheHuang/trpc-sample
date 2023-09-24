import type { Metadata } from 'next'
import Navbar from './_components/Navbar'

export const metadata: Metadata = {
  title: 'ToDo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
