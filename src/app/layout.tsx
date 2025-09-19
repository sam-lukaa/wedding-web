import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { Header } from './(home)/screens/header'
import { TanstackProvider } from '@/shared/providers/tanstack'

export const metadata: Metadata = {
  title: 'Adaeze & Adebisi',
  description: 'A conjugal bliss between two beautiful souls',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Englebert&family=Monsieur+La+Doulaise&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <ToastContainer />

        <TanstackProvider>
        <Header />

        {children}
        </TanstackProvider>
      </body>
    </html>
  )
}
