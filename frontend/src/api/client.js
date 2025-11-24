const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

export async function searchMeals(name){
  const res = await fetch(`${BASE}/search?name=${encodeURIComponent(name)}`)
  if(!res.ok) throw new Error('Search failed')
  const json = await res.json()
  return json.meals || []
}

export async function getCategories(){
  const res = await fetch(`${BASE}/categories`)
  if(!res.ok) throw new Error('Categories failed')
  const json = await res.json()
  return json.categories || []
}

export async function getMealsByCategory(name){
  const res = await fetch(`${BASE}/category/${encodeURIComponent(name)}`)
  if(!res.ok) throw new Error('Category fetch failed')
  const json = await res.json()
  return json.meals || []
}

export async function getMealById(id){
  const res = await fetch(`${BASE}/meal/${encodeURIComponent(id)}`)
  if(!res.ok) throw new Error('Meal fetch failed')
  const json = await res.json()
  return json.meal || null
}

export async function getRandom(){
  const res = await fetch(`${BASE}/random`)
  if(!res.ok) throw new Error('Random failed')
  const json = await res.json()
  return json.meal || null
}