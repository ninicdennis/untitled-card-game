import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-left w-1/2">
        <h1 className="text-4xl text-indigo-400 m-2">Untitled Card Game</h1>
        <p className="text-xl m-2">
          This is a card game I am creating from scratch using boardgame.io and
          Next.js. The purpose of this was to challenge me into creating
          something I didn't really think was possible within a react based
          application. As of right now, this is currently holding as a Proof of
          Concept to see if I am able to maintain a bigger project on myself.
          The concept is similar to Hearthstone, as I feel that genre needs some
          more web love. So I will be attempting a decent recreation, but not
          nearly as polished, of course. (Who knows, maybe in the future I will
          get this actually completed.)
        </p>
        <h2 className="text-lg m-2">
          The card game will be broken down into 5 phases, with hopefully more
          that can be added easily. They go as follows:
        </h2>
        <p className="text-lg m-2">
          <strong>Draw Step</strong> - Draw a card, gain a mana, move on to next
          phase.
        </p>
        <p className="text-lg m-2">
          <strong>Upkeep Step</strong>- This is where you would make your plays,
          consisting of summoning, using spells, etc.
        </p>
        <p className="text-lg m-2">
          <strong>Battle Step</strong> - Where you decide which one of your
          monsters you would like to attack, and which you want to stay.
        </p>
        <p className="text-lg m-2">
          <strong>Offkeep Step</strong> - Similar to Upkeep, this is after
          everything has happened, when you want to use any remaining spells or
          abilities.
        </p>
        <p className="text-lg m-2">
          <strong>End Step</strong> - This is when the turn is over and gets
          passed to the other player.
        </p>
        <p className="text-lg m-2">
          After each End Step, the chart begins at step 1, and repeats until a
          victor is decided.
        </p>
        <Link href="/game">
          <a className="border-2 p-1 hover:bg-purple-400 m-2 text-center">
            Press to Join Game!
          </a>
        </Link>
      </div>
    </div>
  );
}
