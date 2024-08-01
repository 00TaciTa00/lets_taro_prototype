import styles from "@/styles/Home.module.css";
import Deck from "@/components/Deck";
import { useRef, useState } from "react";

export default function Home() {
  const deckRef = useRef<{ shuffleDeck: () => void; spreadDeck: () => void }>(
    null
  );
  const [isSpread, setIsSpread] = useState<boolean>(false);

  const handleShuffle = async () => {
    if (deckRef.current) {
      if (isSpread) {
        handleSpread();
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      deckRef.current.shuffleDeck();
    }
  };

  const handleSpread = () => {
    if (deckRef.current) {
      deckRef.current.spreadDeck();
      setIsSpread(!isSpread);
    }
  };

  return (
    <>
      <main>
        <button onClick={handleShuffle}>섞기</button>
        <button onClick={handleSpread}>{isSpread ? "모으기" : "펼치기"}</button>
        <Deck ref={deckRef} />
      </main>
    </>
  );
}
