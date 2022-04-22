import '../styles/globals.css'
import { AppProps } from 'next/app'
import { StateProvider } from '../React-Context-Api/context'
import reducer, { initialState } from '../React-Context-Api/reducer'
import '../public/Welcome.css'
import { SessionProvider, useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <StateProvider initialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
          </StateProvider>
        </Auth>
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

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = session?.user
  useEffect(() => {
    if (status === 'loading') return
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
