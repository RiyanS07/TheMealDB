import React, {useState} from 'react'
import { searchMeals } from '../api/client'

export default function SearchBar({onSelect}){
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function doSearch(e){
    e?.preventDefault()
    if(!q) return
    setLoading(true); setError(null)
    try{
      const res = await searchMeals(q)
      setResults(res)
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  return (
    <div style={{width:'100%'}}>
      <form className="search" onSubmit={doSearch}>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search meals by name (e.g., Arrabiata)" />
        <button type="submit">Search</button>
      </form>
      {loading && <div className="card" style={{marginTop:8}}>Loading...</div>}
      {error && <div className="card" style={{marginTop:8,color:'red'}}>{error}</div>}
      {results.length>0 && (
        <div className="card" style={{marginTop:8}}>
          <div className="meal-list">
            {results.map(m=> (
              <div key={m.id} className="meal-card" onClick={()=>onSelect(m.id)} style={{cursor:'pointer'}}>
                <img src={m.thumbnail} alt="" />
                <h4>{m.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}