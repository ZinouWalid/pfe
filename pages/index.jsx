import dynamic from 'next/dynamic'
const Head = dynamic(() => import('next/head'))
const Hero = dynamic(() => import('../components/landingPage/Hero'))
const Layout=dynamic(()=> import('../components/landingPage/Layout/Layout'))

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
