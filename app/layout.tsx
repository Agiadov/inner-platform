import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'INNER — поиск вещей по фото или ссылке',
  description: 'INNER помогает найти одежду, аксессуары и компьютерную периферию по фото или ссылке с прозрачной стоимостью до оплаты.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body><Header />{children}<footer className="footer"><div className="container">© 2026 INNER · Поиск вещей по фото или ссылке</div></footer></body></html>
}
