import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Untitled Card Game</h1>
      <Link href ='/game'>
        <a>Game</a>
      </Link>
    </div>
  )
}
