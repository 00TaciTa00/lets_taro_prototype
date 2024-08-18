import { FC, useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/TaroCard.module.css";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "@/types/items";

interface TaroCardProps {
  name: string; // 카드의 이름
  index: number;
  foreImage: string; // 카드 앞면 이미지 URL
  isFlipAble?: boolean; // 뒤집을 수 있는 지
  isHoverAble?: boolean; // 호버하면 카드가 커지는 지
  onSelect?: () => void; // 카드 클릭 시 호출되는 함수
}

const backImage =
  "https://images.unsplash.com/photo-1577084381380-3b9ea4153664?q=80&w=2612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface DropResult {
  name: string;
}

const TaroCard: FC<TaroCardProps> = ({
  name,
  index,
  foreImage,
  isFlipAble = false,
  isHoverAble = false,
  onSelect,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // useRef로 HTMLDivElement를 참조

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { name, index }, // 'card' 타입 드래깅 객체에 할당할 정보
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(), // 현재 드래깅 중인지 아닌지를 리턴
    }),
    end: (item, monitor) => {
      // 드래그가 끝나면 작동
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
  });

  drag(cardRef); // drag 함수를 ref에 연결

  const handleFlip = () => {
    if (isFlipAble) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={handleFlip}
      ref={cardRef} // cardRef를 div의 ref에 전달
      style={{ opacity: isDragging ? 0 : 1 }} // 드래깅 중이면 투명도를 낮춤
    >
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <Image
            src={foreImage}
            alt={name}
            width={150}
            height={275}
            className={`${styles.image} ${isHoverAble ? styles.hovered : ""}`}
          />
          <h2 className={styles.name}>{name}</h2>
        </div>
        <div className={styles.card_back}>
          <Image
            src={backImage}
            alt={name}
            width={150}
            height={275}
            className={`${styles.image} ${isHoverAble ? styles.hovered : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TaroCard;
