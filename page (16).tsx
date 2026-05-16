'use client'
import { useState } from 'react'
import Link from 'next/link'
import { getRequests, STATUS } from '@/components/storage'
export default function Track(){const [q,setQ]=useState(''),[r,setR]=useState<any>(null),[done,setDone]=useState(false);const check=()=>{setDone(true);setR(getRequests().find(x=>x.requestNumber===q.trim()))};return <main className="container"><section className="card"><h1>Проверить статус заявки</h1><div className="row"><input style={{maxWidth:360}} value={q} onChange={e=>setQ(e.target.value)} placeholder="#1248"/><button className="btn" onClick={check}>Проверить</button></div>{done&&(r?<div className="notice"><h2>{r.requestNumber}</h2><p>{r.itemName}</p><p><span className="badge blue">{STATUS[r.status]}</span></p><Link className="btn secondary" href={`/dashboard/request?id=${r.id}`}>Открыть заявку</Link></div>:<p className="notice">Заявка не найдена. Проверьте номер или напишите нам в Telegram.</p>)}</section></main>}
