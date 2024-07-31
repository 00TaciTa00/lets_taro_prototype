import TaroCard from "@/components/TaroCard";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const foreImage =
  "https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  const [cards, setCards] = useState<number[]>(
    Array.from({ length: 78 }, (_, i) => i)
  );
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const startShuffling = async () => {
    setIsShuffling(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const shuffleDeck = () => {
    startShuffling().then(() => setIsShuffling(false));
    const arr = [...cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCards(arr);
  };

  const spreadDeck = () => {
    setIsSpread(!isSpread);
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
          <TaroCard name="샘플" foreImage={foreImage} isFlipAble />
        </div>
        <div>
          <button onClick={shuffleDeck}>
            섞기 : {isShuffling ? "true" : "false"}
          </button>
          <div>
            {cards.map((card) => (
              <span key={card}>{card},</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {/*
          <div
            className={styles.div}
            style={{
              flexGrow: "0",
              position: "relative",
              width: "400px",
              height: "350px",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card}
                className={styles.deck}
                style={{
                  transition: "transform 0.3s",
                  zIndex: cards.length - index,
                  transform: `translate(${index / 2}px, ${index / 5}px)`,
                }}
              >
                <TaroCard
                  name={card.toString()}
                  foreImage={foreImage}
                  onClick={() => console.log(`Card ${card} clicked`)}
                />
              </div>
            ))}
          </div>
          <div
            className={styles.div}
            style={{
              flexGrow: "1",
              position: "relative",
              width: "100%",
              height: "350px",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card}
                className={styles.deck}
                style={{
                  transition: "transform 0.3s",
                  zIndex: cards.length - index,
                  transform: `translate(${index * 10}px)`,
                }}
              >
                <TaroCard
                  name={card.toString()}
                  foreImage={foreImage}
                  isFlipAble
                  onClick={() => console.log(`Card ${card} clicked`)}
                />
              </div>
            ))}
          </div> */}
        </div>
        <button onClick={spreadDeck}>{!isSpread ? "펼치기" : "겹치기"}</button>
        <div
          className={styles.div}
          style={{
            flexGrow: "0",
            width: "100%",
            height: "350px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={card}
                className={styles.deck}
                style={{
                  top: "0",
                  transition: "transform 1s",
                  zIndex: cards.length - index,
                  transform: !isSpread
                    ? isShuffling
                      ? `translate(${index / 2}px, ${index / 5}px)`
                      : `translate(0)`
                    : `translate(${(-39 + index) * 11}px)`,
                }}
              >
                <TaroCard
                  name={card.toString()}
                  foreImage={foreImage}
                  isHoverAble={isSpread ? true : false}
                  onClick={() => console.log(`Card ${card} clicked`)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
