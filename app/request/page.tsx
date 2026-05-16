'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { addRequest } from '@/components/storage'

export default function RequestPage(){
 const [form,setForm]=useState<any>({itemName:'',brand:'',productUrl:'',size:'',budget:'',city:'',category:'Одежда / обувь',contactMethod:'Telegram',contactValue:'',comment:''})
 const [ok,setOk]=useState<any>(null),[err,setErr]=useState(''),[loading,setLoading]=useState(false)
 useEffect(()=>{const p=new URLSearchParams(location.search); const profile=JSON.parse(localStorage.getItem('inner_user_profile')||'{}'); setForm((f:any)=>({...f,itemName:p.get('item')||f.itemName,brand:p.get('brand')||f.brand,budget:p.get('budget')||f.budget,city:profile.city||f.city,contactValue:profile.telegram||profile.phone||profile.email||f.contactValue,size:profile.clothingSize||profile.shoeSize||f.size}))},[])
 const set=(k:string,v:string)=>setForm((f:any)=>({...f,[k]:v}))
 async function submit(e:any){e.preventDefault();setErr(''); if(!form.itemName&&!form.productUrl&&!form.brand){setErr('Укажите фото/ссылку или название товара');return} if(!form.city||!form.contactValue){setErr('Укажите город и контакт');return} setLoading(true); const item=addRequest(form); try{const res=await fetch('/api/telegram',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,requestNumber:item.requestNumber,createdAt:item.createdAt})}); if(!res.ok) console.error('Telegram error',await res.json())}catch(e){console.error(e)} setOk(item); setLoading(false)}
 if(ok)return <main className="container"><section className="card"><span className="badge green">Заявка создана</span><h1>{ok.requestNumber}</h1><p className="muted">Мы получили заявку и свяжемся с вами в Telegram/WhatsApp. Уведомление менеджеру отправлено или придёт с задержкой.</p><div className="row"><Link className="btn" href="/dashboard">Перейти в кабинет</Link><Link className="btn secondary" href="/request">Создать ещё заявку</Link></div></section></main>
 return <main className="container"><section className="card"><h1>Найти вещь</h1><p className="muted">Загрузите ссылку или опишите товар. Мы найдём варианты и покажем финальную цену.</p>{err&&<p className="notice" style={{color:'var(--red)'}}>{err}</p>}<form onSubmit={submit} className="grid">
  <div className="field"><label>Категория</label><select value={form.category} onChange={e=>set('category',e.target.value)}><option>Одежда / обувь</option><option>Аксессуары</option><option>Компьютерная периферия</option><option>Другое</option></select></div>
  <div className="field"><label>Товар / модель</label><input value={form.itemName} onChange={e=>set('itemName',e.target.value)} placeholder="Например Wooting 80HE"/></div>
  <div className="grid grid3"><div className="field"><label>Бренд</label><input value={form.brand} onChange={e=>set('brand',e.target.value)}/></div><div className="field"><label>Размер</label><input value={form.size} onChange={e=>set('size',e.target.value)}/></div><div className="field"><label>Бюджет</label><input value={form.budget} onChange={e=>set('budget',e.target.value)}/></div></div>
  <div className="field"><label>Ссылка на товар</label><input value={form.productUrl} onChange={e=>set('productUrl',e.target.value)} placeholder="https://..."/></div>
  <div className="grid grid3"><div className="field"><label>Город</label><input value={form.city} onChange={e=>set('city',e.target.value)}/></div><div className="field"><label>Способ связи</label><select value={form.contactMethod} onChange={e=>set('contactMethod',e.target.value)}><option>Telegram</option><option>WhatsApp</option><option>Телефон</option><option>Email</option></select></div><div className="field"><label>Контакт</label><input value={form.contactValue} onChange={e=>set('contactValue',e.target.value)} placeholder="@username"/></div></div>
  <div className="field"><label>Комментарий</label><textarea value={form.comment} onChange={e=>set('comment',e.target.value)}/></div>
  <button className="btn" disabled={loading}>{loading?'Отправляем...':'Отправить заявку'}</button>
 </form></section></main>
}
