import { useEffect, useState } from "react";
import styles from "@/styles/TaroCorner.module.css";

interface TaroCornerProps {
  rotateDegree: number;
  correction: number;
  onClick: (currentDirection: string) => void;
}

const TaroCorner: React.FC<TaroCornerProps> = ({
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
  }, [rotateDegree, correction]);

  return (
    <div
      className={`${styles.corner} ${styles[directionList[correction]]}`}
      onClick={() => onClick(currentDirection)}
    />
  );
};

export default TaroCorner;
