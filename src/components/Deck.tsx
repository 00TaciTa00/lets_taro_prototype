import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "@/styles/Deck.module.css";
import TaroCard from "./TaroCard";

interface DeckProps {
  shuffleDeck: () => void;
  spreadDeck: () => void;
}

const foreImage =
  "https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Deck = forwardRef<DeckProps>((props, ref) => {
  const [cards, setCards] = useState<number[]>(
    Array.from({ length: 78 }, (_, i) => i)
  );
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isSpread, setIsSpread] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    shuffleDeck,
    spreadDeck,
  }));

  const startShuffling = async () => {
    setIsShuffling(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const shuffleDeck = async () => {
    if (!isSpread) {
      await startShuffling().then(() => setIsShuffling(false));
      const arr = [...cards];
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setCards(arr);
    }
  };

  const spreadDeck = () => {
    setIsSpread(!isSpread);
  };

  return (
    <div>
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
              foreImage={foreImage}
              isHoverAble={isSpread ? true : false}
              onClick={() => console.log(`Card ${card} clicked`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

Deck.displayName = "Deck";

export default Deck;
