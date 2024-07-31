import TaroCard from "@/components/TaroCard";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const foreImage =
  "https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  const [cards, setCards] = useState<number[]>([]);

  const shuffleCards = () => {
    const arr = Array.from({ length: 78 }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCards(arr);
  };

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
          <TaroCard name="샘플" foreImage={foreImage} />
        </div>
        <button onClick={shuffleCards}>섞기</button>
        <button>펼치기</button>
        <div>
          {cards.map((card) => (
            <span key={card}>{card},</span>
          ))}
        </div>
      </main>
    </>
  );
}
