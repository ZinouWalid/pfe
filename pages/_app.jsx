import '../styles/globals.css'
import { AppProps } from 'next/app'
import { StateProvider } from '../React-Context-Api/context'
import reducer, { initialState } from '../React-Context-Api/reducer'
import '../public/Welcome.css'
import { SessionProvider, useSession, signIn } from 'next-auth/react'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
          <StateProvider initialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
          </StateProvider>
      ) : (
        <StateProvider initialState={initialState} reducer={reducer}>
         <Component {...pageProps} />
        </StateProvider>
        //<h1>Loading ...</h1>
      )}
    </SessionProvider>
  )
}

export default MyApp
