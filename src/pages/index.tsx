import { useState } from "react";
import Layout from "@/components/Layout";
import TaroCard from "@/components/TaroCard";
import styles from "@/styles/Home.module.css";
import useDoubleTouch from "@/util/onDoubleTouch";

export default function Home() {
  const [deck, setDeck] = useState<number[]>(
    Array.from({ length: 78 }, (_, i) => i)
  );
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

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
    const arr = [...deck];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDeck(arr);
  };

  const spreadDeck = () => {
    setIsSpread(!isSpread);
  };

  const handleClickSelect = (card: number) => {
    if (!isSpread || selectedCards.includes(card)) return;
    console.log(card);
    setSelectedCards([...selectedCards, card]);
  };

  const handleTouchSelect = useDoubleTouch((card: number) => {
    handleClickSelect(card);
  });

  return (
    <>
      <Layout>
        <main className={styles.mainpage}>
          <div className={styles.buttons}>
            <button onClick={shuffleDeck}>섞기</button>
            <button onClick={spreadDeck}>펼치기</button>
          </div>
          <div className={styles.deck}>
            {deck.map((card, index) => (
              <div
                key={card}
                className={`${styles.card}`}
                style={{
                  zIndex: 78 - index,
                  transform: !isSpread
                    ? isShuffling
                      ? `translate(${index / 2}px, ${index / 5}px)`
                      : `translate(0)`
                    : `translate(${(-39 + index) * 12}px)`,
                }}
                onDoubleClick={() => handleClickSelect(card)}
                onTouchEnd={() => handleTouchSelect(card)}
              >
                <TaroCard taroNumber={card} disabled />
              </div>
            ))}
          </div>
          <div className={`${styles.table}`}>
            {selectedCards.map((selectedCard, index) => (
              <TaroCard key={index} taroNumber={selectedCard} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
}
