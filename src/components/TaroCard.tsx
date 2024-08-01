// components/TaroCard.tsx
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/TaroCard.module.css";

interface TaroCardProps {
  name: string; // 카드의 이름
  index: number;
  foreImage: string; // 카드 앞면 이미지 URL
  isFlipAble?: boolean; // 뒤집을 수 있는 지
  isHoverAble?: boolean; // 호버하면 카드가 커지는 지
  isSelecteAble?: boolean;
  onSelect?: () => void; // 카드 클릭 시 호출되는 함수
}

const backImage =
  "https://images.unsplash.com/photo-1577084381380-3b9ea4153664?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const TaroCard: React.FC<TaroCardProps> = ({
  name,
  index,
  foreImage,
  isFlipAble = false,
  isHoverAble = false,
  isSelecteAble = false,
  onSelect,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleFlip = () => {
    if (isFlipAble) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleSelect = () => {
    if (isSelecteAble) {
      console.log(`Card ${name} clicked`);
      setIsSelected(!isSelected);
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={handleFlip}
    >
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <Image
            src={foreImage}
            alt={name}
            width={200}
            height={300}
            className={`${styles.image} ${isHoverAble ? styles.hovered : ""}`}
          />
          <div className={styles.info}>
            <h2 className={styles.title}>{name}</h2>
          </div>
        </div>
        <div className={styles.card_back} onClick={handleSelect}>
          <Image
            src={backImage}
            alt={name}
            width={200}
            height={300}
            className={`${styles.image} ${isHoverAble ? styles.hovered : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TaroCard;
