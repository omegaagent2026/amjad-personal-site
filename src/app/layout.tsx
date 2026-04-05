import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Amjad Chaudhry',
  description: 'Engineer, educator, and traveler. Writing on technology, education, and the world.',
  openGraph: {
    title: 'Amjad Chaudhry',
    description: 'Engineer, educator, and traveler.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#0f0f11] text-white">{children}</body>
    </html>
  )
}
