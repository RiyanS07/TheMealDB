import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getMealById } from '../api/client'

export default function MealDetail(){
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(()=>{fetch()}, [id])
  async function fetch(){ setLoading(true); setErr(null)
    try{ const m = await getMealById(id); setMeal(m) }catch(e){ setErr(e.message) }
    setLoading(false)
  }

  if(loading) return <div className="card">Loading...</div>
  if(err) return <div className="card" style={{color:'red'}}>{err}</div>
  if(!meal) return <div className="card">Meal not found</div>

  const embed = meal.youtube ? meal.youtube.replace('watch?v=', 'embed/') : null

  return (
    <div className="detail">
      <div className="detail-grid">
        <div className="card">
          <img src={meal.thumbnail} alt="" style={{width:'100%',borderRadius:8}} />
          <h2 style={{marginTop:8}}>{meal.name}</h2>
          <div style={{color:'#666'}}>{meal.category} • {meal.area}</div>
          <div className="ingredients" style={{marginTop:12}}>
            <h3>Ingredients</h3>
            <ul>
              {meal.ingredients?.map((ing,idx)=> <li key={idx}>{ing}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Instructions</h3>
            <div className="instructions">{meal.instructions}</div>
          </div>

          {embed && (
            <div className="card" style={{marginTop:12}}>
              <h3>Video</h3>
              <div style={{position:'relative',paddingTop:'56%'}}>
                <iframe src={embed} title="video" style={{position:'absolute',left:0,top:0,width:'100%',height:'100%'}} frameBorder="0" allowFullScreen />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
