import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMealsByCategory } from '../api/client'

export default function CategoryMeals(){
  const { name } = useParams()
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(()=>{fetch()}, [name])
  async function fetch(){ setLoading(true); setErr(null)
    try{ const m = await getMealsByCategory(name); setMeals(m) }catch(e){ setErr(e.message) }
    setLoading(false)
  }

  return (
    <div>
      <h2>Category: {name}</h2>
      {loading && <div className="card">Loading meals...</div>}
      {err && <div className="card" style={{color:'red'}}>{err}</div>}
      <div className="meal-list" style={{marginTop:12}}>
        {meals.map(m=> (
          <div key={m.id} className="card meal-card" onClick={()=>navigate(`/meal/${m.id}`)} style={{cursor:'pointer'}}>
            <img src={m.thumbnail} alt="" />
            <h4>{m.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
