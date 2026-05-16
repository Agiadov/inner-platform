'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function Header(){
  const [theme,setTheme]=useState<'light'|'graphite'>('light')
  useEffect(()=>{const saved=(localStorage.getItem('inner_theme') as any)||'light';setTheme(saved);document.documentElement.classList.toggle('graphite',saved==='graphite')},[])
  const toggle=()=>{const next=theme==='light'?'graphite':'light';setTheme(next);localStorage.setItem('inner_theme',next);document.documentElement.classList.toggle('graphite',next==='graphite')}
  return <header className="header"><nav className="nav">
    <Link href="/" className="logo"><span className="mark">✦</span><span>INNER</span></Link>
    <div className="links">
      <Link href="/request">Заявка</Link><Link href="/dashboard">Кабинет</Link><Link href="/catalog">Находки</Link><Link href="/track">Проверить</Link><Link href="/support">Поддержка</Link><Link href="/admin">Админка</Link>
      <button className="theme" onClick={toggle}>{theme==='light'?<Moon size={16}/>:<Sun size={16}/>} {theme==='light'?'Графитовая':'Светлая'}</button>
      <Link className="btn" href="/request">Отправить заявку</Link>
    </div>
  </nav></header>
}
