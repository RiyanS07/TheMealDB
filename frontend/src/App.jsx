import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Categories from './components/Categories'
import CategoryMeals from './components/CategoryMeals'
import MealDetail from './components/MealDetail'
import RandomButton from './components/RandomButton'
import Layout from './components/Layout'

function App(){
  const navigate = useNavigate()
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/category/:name" element={<CategoryMeals />} />
        <Route path="/meal/:id" element={<MealDetail />} />
      </Routes>
    </Layout>
  )
}

function Home({navigate}){
  return (
    <div className="container">
      <div className="top-row">
        <SearchBar onSelect={(id)=>navigate(`/meal/${id}`)} />
        <RandomButton onShow={(id)=>navigate(`/meal/${id}`)} />
      </div>
      <Categories onSelect={(name)=>navigate(`/category/${encodeURIComponent(name)}`)} />
    </div>
  )
}

export default App