import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import CategoryFilter from '../components/home/CategoryFilter'
import ProductList from '../components/home/ProductList'

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <TrustStrip/>
      <CategoryFilter/>
      <ProductList/>
    </div>
  )
}

export default Home