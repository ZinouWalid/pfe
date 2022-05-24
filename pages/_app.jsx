import '../styles/globals.css'
import { StateProvider } from '../React-Context-Api/context'
import reducer, { initialState } from '../React-Context-Api/reducer'
import '../public/Welcome.css'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </StateProvider>
    </SessionProvider>
  )
}

export default MyApp
