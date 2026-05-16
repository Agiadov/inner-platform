'use client'
import { useState } from 'react'
const answers:any={
 'Как работает сервис?':'Вы отправляете фото, ссылку или описание. Менеджер INNER ищет варианты, проверяет продавца и фиксирует финальную стоимость до оплаты.',
 'Как формируется цена?':'Цена товара + доставка + комиссия сервиса + возможные пошлины = финальная стоимость. Финальную цену подтверждает менеджер.',
 'Когда будет доставка?':'Обычно 7–14 дней, но срок зависит от страны, продавца и выбранного варианта. Менеджер подтверждает срок до оплаты.',
 'Как проверить заявку?':'Откройте страницу “Проверить заявку” и введите номер, например #1248.',
 'Как связаться с менеджером?':'Нажмите кнопку “Передать вопрос менеджеру” или напишите в Telegram.'
}
export default function Support(){const [msgs,setMsgs]=useState<any[]>([{role:'ai',text:'Здравствуйте! Я помощник INNER. Чем помочь?'}]);const ask=(q:string)=>setMsgs([...msgs,{role:'user',text:q},{role:'ai',text:answers[q]}]);return <main className="container"><section className="card"><h1>Помощник INNER</h1><p className="muted">AI-помощник помогает с информацией. Финальную цену, наличие и условия выкупа подтверждает менеджер.</p><div className="row">{Object.keys(answers).map(q=><button className="btn secondary" key={q} onClick={()=>ask(q)}>{q}</button>)}</div><div className="grid" style={{marginTop:20}}>{msgs.map((m,i)=><div className="notice" key={i}><b>{m.role==='ai'?'INNER':'Вы'}</b><p>{m.text}</p></div>)}</div><a className="btn" href="https://t.me/gymarms" target="_blank" style={{marginTop:16}}>Передать вопрос менеджеру</a></section></main>}
