import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "@/styles/TaroCard.module.css";
import { BackImage } from "@/types/types";
import Image from "next/image";

interface CardProps {
  taroNumber: number;
  disabled?: boolean;
  isReversed?: boolean;
}

interface InnerLayoutProps {
  isFront: boolean;
  isReversed?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

interface CornerProps {
  rotateDegree: number;
  correction: number;
  onClick: (currentDirection: string) => void;
}

const CardInner: React.FC<InnerLayoutProps> = ({
  isFront,
  isReversed = false,
  children,
  onClick,
}) => {
  return (
    <div
      className={`handle ${styles.inner_layout} ${
        isFront
          ? isReversed
            ? styles.card_front_reversed
            : styles.card_front
          : styles.card_back
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Corner: React.FC<CornerProps> = ({
  rotateDegree,
  correction,
  onClick,
}) => {
  const directionList = ["top", "right", "bottom", "left"];
  const [currentDirection, setCurrentDirection] = useState(
    directionList[correction]
  );

  useEffect(() => {
    const currentRotate = rotateDegree % 360;
    if (currentRotate === 0) {
      setCurrentDirection(directionList[correction]);
    } else if (currentRotate === 90 || currentRotate === -270) {
      setCurrentDirection(directionList[(correction + 1) % 4]);
    } else if (currentRotate === 180 || currentRotate === -180) {
      setCurrentDirection(directionList[(correction + 2) % 4]);
    } else if (currentRotate === 270 || currentRotate === -90) {
      setCurrentDirection(directionList[(correction + 3) % 4]);
    }
  }, [rotateDegree]);

  return (
    <div
      className={`${styles.corner} ${styles[directionList[correction]]}`}
      onClick={() => onClick(currentDirection)}
    />
  );
};

const TaroCard: React.FC<CardProps> = ({
  taroNumber,
  disabled = false,
  isReversed = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0);

  const handleRotate = (currentDirection: string) => {
    if (disabled) return;
    if (currentDirection === "right") {
      setRotateDegree((prev) => prev + 90);
    } else if (currentDirection === "left") {
      setRotateDegree((prev) => prev - 90);
    }
  };

  const handleFlip = () => {
    if (disabled) return;
    setIsFlipped(!isFlipped);
  };

  const getTransformStyle = () => {
    let transform = `rotate(${rotateDegree}deg)`;
    if (isFlipped) {
      transform = `rotate(${-rotateDegree}deg) rotateY(180deg)`;
    } else {
      transform = `rotate(${rotateDegree}deg)`;
    }
    return { transform };
  };

  return (
    <Draggable handle=".handle" bounds="parent" disabled={disabled}>
      <div className={`${styles.card}`}>
        <div className={styles.card_inner} style={getTransformStyle()}>
          <Corner
            rotateDegree={rotateDegree}
            correction={0}
            onClick={handleRotate}
          />
          <Corner
            rotateDegree={rotateDegree}
            correction={1}
            onClick={handleRotate}
          />
          <Corner
            rotateDegree={rotateDegree}
            correction={2}
            onClick={handleRotate}
          />
          <Corner
            rotateDegree={rotateDegree}
            correction={3}
            onClick={handleRotate}
          />
          <CardInner
            isFront={true}
            isReversed={isReversed}
            onClick={handleFlip}
          >
            {taroNumber} front {rotateDegree}
          </CardInner>
          <CardInner isFront={false} onClick={handleFlip}>
            <Image src={BackImage} alt={taroNumber.toString()} fill />
          </CardInner>
        </div>
      </div>
    </Draggable>
  );
};

export default TaroCard;
