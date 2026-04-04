import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amjad Chaudhry',
  description: 'Engineer, educator, and traveler.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
