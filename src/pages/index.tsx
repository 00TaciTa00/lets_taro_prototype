import styles from "@/styles/Home.module.css";
import { useState } from "react";
import TestCard from "@/components/TestCard";
import Layout from "@/components/Layout";
import TaroCard from "@/components/TaroCard";

const foreImage =
  "https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Home() {
  const [cards, setCards] = useState<number[]>(
    Array.from({ length: 78 }, (_, i) => i)
  );
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [cardList, setCardList] = useState<number[]>([]);

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

  const handleCardListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCardList(Array.from({ length: value }, (_, i) => i + 1));
  };

  const handleCardChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = Number(event.target.value);
    const arr = [...cardList];
    arr[index] = value;
    setCardList(arr);
  };

  return (
    <>
      <Layout>
        <button onClick={shuffleDeck}>섞기</button>
        <button onClick={spreadDeck}>펼치기</button>
        <input
          type="range"
          id="cards"
          min="0"
          max="10"
          list="values"
          onChange={handleCardListChange}
        />
        <datalist id="values">
          <option value="0" label="0"></option>
          <option value="5" label="5"></option>
          <option value="10" label="10"></option>
        </datalist>
        {cardList.map((selectedCard, index) => (
          <span key={index}>
            {index} :{" "}
            <input
              type="number"
              defaultValue={selectedCard}
              min={1}
              max={78}
              style={{ display: "inline-block", width: "32px" }}
              onChange={(event) => handleCardChange(event, index)}
            />
          </span>
        ))}
        <main className={styles.mainpage}>
          <div className={styles.deck}>
            {cards.map((card, index) => (
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
              >
                <TaroCard taroNumber={card} disabled />
              </div>
            ))}
          </div>
          <div className={`${styles.table}`}>
            <TaroCard taroNumber={100} />
          </div>
        </main>
      </Layout>
    </>
  );
}
