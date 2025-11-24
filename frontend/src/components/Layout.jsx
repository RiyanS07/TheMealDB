import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({children}){
  return (
    <div>
      <header className="container header">
        <div className="brand">
          <img src="/logo.png" alt="logo" width="36"/>
          <h1>TheMealDB Explorer</h1>
        </div>
        <nav>
          <Link to="/" className="link">Home</Link>
        </nav>
      </header>
      <main className="container">
        {children}
      </main>
      <footer className="container footer">Built for Finfactor - TheMealDB Explorer - By Riyan Shaikh</footer>
    </div>
  )
}