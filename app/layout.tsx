import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n/context'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  style: ['normal', 'italic']
});

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Yaku3D — Impresión 3D de diseño propio',
  description: 'Objetos funcionales, deco y piezas a medida, diseñados y fabricados en nuestro taller. Envíos a todo el país.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0910',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // `lang` arranca en español y el toggle ES/EN lo actualiza desde el cliente.
    <html lang="es" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased bg-[var(--yaku-bg)] text-[var(--yaku-text)] overflow-x-hidden`}>
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
