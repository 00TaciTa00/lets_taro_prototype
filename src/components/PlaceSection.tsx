import styles from "@/styles/PlaceSection.module.css";
import { ItemTypes } from "@/types/items";
import { useDrop } from "react-dnd";
import { useRef, useState, useEffect } from "react";

export const PlaceSection: React.FC = () => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [numOverCards, setNumOverCards] = useState<number>(0);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD, // 드롭 가능한 아이템의 타입을 지정합니다.
    drop: () => ({ name: "CardPlace" }), // 드롭이 발생했을 때 반환할 데이터를 지정합니다.
    collect: (monitor) => ({
      isOver: monitor.isOver(), // 현재 드래그 중인 아이템이 컴포넌트 위에 있는지 여부를 나타냅니다.
      canDrop: monitor.canDrop(), // 현재 컴포넌트가 드롭을 수락할 수 있는지 여부를 나타냅니다.
    }),
  });

  drop(dropRef); // 드롭 대상 요소에 드롭 이벤트를 적용합니다.

  const isActive = canDrop && isOver; // 컴포넌트가 드래그 중인 아이템을 수락할 수 있는 상태인지 여부를 나타냅니다.
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "darkgreen"; // 컴포넌트 위에 드래그 중인 아이템이 있을 때 배경색을 변경합니다.
  } else if (canDrop) {
    backgroundColor = "darkkhaki"; // 컴포넌트가 드롭을 수락할 수 있는 상태일 때 배경색을 변경합니다.
  }

  useEffect(() => {
    const monitor = dropRef.current?.getBoundingClientRect(); // dropRef 요소의 위치와 크기를 가져옵니다.
    if (monitor) {
      // monitor가 null이 아닌지 확인합니다.
      const overCards = document
        .elementsFromPoint(monitor.x, monitor.y) // 요소의 위치에 있는 모든 요소를 가져옵니다.
        .filter(
          (element) => (element as HTMLElement).dataset.testid === "card" // "card" 데이터 속성을 가진 요소만 필터링합니다.
        );
      setNumOverCards(overCards.length); // 필터링된 요소의 개수를 상태로 설정합니다.
    }
  }, [isActive]);

  return (
    <div
      ref={dropRef}
      data-testid="cardplace"
      style={{ backgroundColor }}
      className={styles.place_section}
    >
      {isActive ? "Release to drop" : "Drag a card here"} : {numOverCards}
    </div>
  );
};
