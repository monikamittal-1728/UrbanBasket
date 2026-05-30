import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import CategoryFilter from '../components/home/CategoryFilter'

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <TrustStrip/>
      <CategoryFilter/>
    </div>
  )
}

export default Home