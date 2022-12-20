import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CTA/>
      <Footer />
    </>
  )
}
