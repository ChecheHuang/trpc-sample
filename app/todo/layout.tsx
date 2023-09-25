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
    <div className="w-full min-h-screen box-border flex flex-col pb-20 ">
      <Navbar />
      {children}
    </div>
  )
}
