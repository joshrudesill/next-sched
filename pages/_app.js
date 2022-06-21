import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(
    {
      auth: false,
      email: ''
    });
  return (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} auth={auth} setAuth={setAuth}/>
  </>
  )
}




export default MyApp
