import TaroCard from "@/components/TaroCard";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Let&apos;s Taro!</title>
        <meta name="description" content="Let's Taro!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.div}>
          <TaroCard
            name="샘플"
            foreImage="https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <button>섞기</button>
        <button>펼치기</button>
      </main>
    </>
  );
}
