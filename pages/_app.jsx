import '../styles/globals.css'
import { AppProps } from 'next/app'
import { StateProvider } from '../React-Context-Api/context'
import reducer, { initialState } from '../React-Context-Api/reducer'
import '../public/Welcome.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp
