import styles from "@/styles/Home.module.css";
import { useState } from "react";
import TaroCard from "@/components/TaroCard";

const foreImage =
  "https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  const [cards, setCards] = useState<number[]>(
    Array.from({ length: 78 }, (_, i) => i)
  );
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSpread, setIsSpread] = useState<boolean>(false);

  const startShuffling = async () => {
    setIsShuffling(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const shuffleDeck = async () => {
    if (isSpread) {
      setIsSpread(false);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    await startShuffling().then(() => setIsShuffling(false));
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
      <main>
        <button onClick={shuffleDeck}>섞기</button>
        <button onClick={spreadDeck}>펼치기</button>
        <div className={styles.deckContainer}>
          {cards.map((card, index) => (
            <div
              key={card}
              className={styles.deck}
              style={{
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
                index={index}
                foreImage={foreImage}
                isHoverAble={isSpread ? true : false}
                isSelecteAble={isSpread ? true : false}
                onSelect={() => console.log(`Card ${card} clicked`)}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
