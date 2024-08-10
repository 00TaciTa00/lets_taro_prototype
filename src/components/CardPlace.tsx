import { FC, useRef } from "react";
import { ItemTypes } from "@/types/items";
import { useDrop } from "react-dnd";
import styles from "@/styles/CardPlace.module.css";

export const CardPlace: FC = () => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: "CardPlace" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(dropRef);

  const isActive = canDrop && isOver;
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div
      ref={dropRef}
      data-testid="cardplace"
      style={{ backgroundColor }}
      className={styles.place}
    >
      {isActive ? "Release to drop" : "Drag a card here"}
    </div>
  );
};
