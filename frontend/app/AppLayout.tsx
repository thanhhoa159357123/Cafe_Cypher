'use client'

import Navbar from './components/items/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
      <Navbar />
      {children}
    </div>
  )
}
