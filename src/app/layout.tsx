import { Inter } from 'next/font/google'
import { Providers } from '@/components'
import type { Metadata } from 'next'
import type { PropNode } from '@/interfaces'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Some',
}

export default function RootLayout({ children }: PropNode) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
