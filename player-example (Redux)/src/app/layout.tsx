import '@/styles/global.css'

import type { Metadata } from 'next'

import { GlobalProviders } from '@/providers/global-provider'

import { Montserrat } from 'next/font/google'
const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RS - Ignite | Redux player',
  description: 'An video player app to give an idea on how to use Redux',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  )
}
