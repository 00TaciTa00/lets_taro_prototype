import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "@/styles/TaroCard.module.css";
import { BackImage } from "@/types/types";
import Image from "next/image";
import useDoubleTouch from "@/util/onDoubleTouch";
import TaroCorner from "./TaroCorner";
import TaroInner from "./TaroInner";
import taroInfo from "@/data/taroInfo.json";

interface CardProps {
  taroNumber: number;
  disabled?: boolean;
  isReversed?: boolean;
}

const TaroCard: React.FC<CardProps> = ({
  taroNumber,
  disabled = false,
  isReversed = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0);
  const cardInfo = taroInfo.find((card) => card.id === taroNumber);

  const handleRotate = (currentDirection: string) => {
    if (disabled) return;
    if (currentDirection === "right") {
      setRotateDegree((prev) => prev + 90);
    } else if (currentDirection === "left") {
      setRotateDegree((prev) => prev - 90);
    }
  };

  const handleClickFlip = () => {
    console.log("handleClickFlip");
    if (disabled) return;
    setIsFlipped(!isFlipped);
  };

  const handleTouchFlip = useDoubleTouch(() => {
    console.log("handleTouchFlip");
    handleClickFlip();
  });

  const getTransformStyle = () => {
    let transform = `rotate(${rotateDegree}deg)`;
    if (isFlipped) {
      transform = `rotate(${rotateDegree}deg) rotateY(180deg)`;
    }
    return { transform };
  };

  return (
    <Draggable handle=".handle" bounds="parent" disabled={disabled}>
      <div className={`${styles.card}`}>
        <div className={styles.card_inner} style={getTransformStyle()}>
          <TaroCorner
            rotateDegree={rotateDegree}
            correction={0}
            onClick={handleRotate}
          />
          <TaroCorner
            rotateDegree={rotateDegree}
            correction={1}
            onClick={handleRotate}
          />
          <TaroCorner
            rotateDegree={rotateDegree}
            correction={2}
            onClick={handleRotate}
          />
          <TaroCorner
            rotateDegree={rotateDegree}
            correction={3}
            onClick={handleRotate}
          />
          <TaroInner
            isFront={true}
            isReversed={isReversed}
            onDoubleClick={handleClickFlip}
            onDoubleTouch={handleTouchFlip}
          >
            {cardInfo?.romanNum} {cardInfo?.name} {rotateDegree}
          </TaroInner>
          <TaroInner
            isFront={false}
            onDoubleClick={handleClickFlip}
            onDoubleTouch={handleTouchFlip}
          >
            <Image
              src={BackImage}
              alt={cardInfo?.name?.toString() || "Taro Card"}
              fill
            />
          </TaroInner>
        </div>
      </div>
    </Draggable>
  );
};

export default TaroCard;
