import React, {useEffect, useState} from 'react'
import { getCategories } from '../api/client'

export default function Categories({onSelect}){
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(()=>{fetchCats()}, [])
  async function fetchCats(){
    setLoading(true); setErr(null)
    try{ const c = await getCategories(); setCats(c) }catch(e){ setErr(e.message) }
    setLoading(false)
  }

  return (
    <div>
      <h2>Categories</h2>
      {loading && <div className="card">Loading categories...</div>}
      {err && <div className="card" style={{color:'red'}}>{err}</div>}
      <div className="grid" style={{marginTop:12}}>
        {cats.map(cat=> (
          <div key={cat.id} className="card cat-card" onClick={()=>onSelect(cat.name)} style={{cursor:'pointer'}}>
            <img src={cat.thumbnail} alt="" />
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}