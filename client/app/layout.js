import Navbar from '@/components/layout/navbar'
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({subsets : ['latin'], weight : "500"})

export const metadata = {
  title: 'Marcos',
  description: 'Marcos Password Manager',
  icons : {
    icon : "./favicon.ico"
  }
}

export default function RootLayout({ children }) {
  
  return (
    <ClerkProvider afterSignInUrl='/dashboard' afterSignUpUrl='/dashboard'>
      <html lang="en">
        <body className={`${poppins.className} ovreflow-hidden`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
