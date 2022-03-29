import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { WorkCalendar } from '../component/WorkCalendar'

const Home: NextPage = () => {
  return (
    <WorkCalendar/>
  )
}

export default Home
