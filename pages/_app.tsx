import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="google-site-verification" content="g3DXYh4M3WRdin5hSE4hR5Gf-ZT0yJd_hiFiTF3M674" />
    </Head>
    <Component {...pageProps} />
  </>
}
export default MyApp
