import Head from 'next/head'

import Hero from '../components/landingPage/Hero'

//import Header from '../components/landingPage/Layout/Header'
import Layout from '../components/landingPage/Layout/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>9odyani</title>
        <link rel='shortcut icon' href='/images/Logo.jpg' />
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </>
  )
}
