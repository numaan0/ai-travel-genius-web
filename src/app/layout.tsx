// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import NextAuthProvider from "@/providers/SessionProvider";
import Header from "@/components/layout/header";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Travel Genius - Your Smart Trip Planner',
  description: 'What if trip planning was as addictive as Instagram and as smart as ChatGPT? Discover personalized itineraries with one-click booking!',
  keywords: 'AI travel planner, trip planner, travel itinerary, smart travel, EaseMyTrip',
  authors: [{ name: 'AI Travel Genius Team' }],
  openGraph: {
    title: 'AI Travel Genius - Your Smart Trip Planner',
    description: 'Revolutionary AI-powered trip planning with personalized itineraries and one-click booking',
    images: ['/images/hero-bg.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900`}>

        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            // style: {
            //   background: '#1f2937',
            //   color: '#fff',
            // },
          }}
          />
          </div>
      </body>
    </html>
  )
}
