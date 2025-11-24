import React, {useState} from 'react'
import { getRandom } from '../api/client'

export default function RandomButton({onShow}){
  const [loading,setLoading] = useState(false)
  const [err,setErr] = useState(null)
  async function doRandom(){ setLoading(true); setErr(null)
    try{ const m = await getRandom(); if(m) onShow(m.id) }catch(e){ setErr(e.message) }
    setLoading(false)
  }
  return (
    <div style={{minWidth:160}}>
      <button className="card" onClick={doRandom} style={{padding:'10px 14px',borderRadius:8,background:'var(--accent)',color:'#fff',border:'none',cursor:'pointer'}}>
        {loading? 'Loading...' : "I'm feeling hungry"}
      </button>
      {err && <div style={{color:'red',marginTop:8}}>{err}</div>}
    </div>
  )
}