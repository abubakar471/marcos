import Navbar from '@/components/layout/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Marcos',
  description: 'Marcos Password Manager',
}

export default function RootLayout({ children }) {
  
  return (
    <ClerkProvider afterSignInUrl='/dashboard' afterSignUpUrl='/dashboard' af>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
