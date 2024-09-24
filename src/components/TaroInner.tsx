import styles from "@/styles/TaroInner.module.css";

interface TaroInnerProps {
  isFront: boolean;
  isReversed?: boolean;
  children: React.ReactNode;
  onDoubleClick?: () => void;
  onDoubleTouch?: (arg?: any) => void;
}

const TaroInner: React.FC<TaroInnerProps> = ({
  isFront,
  isReversed = false,
  children,
  onDoubleClick,
  onDoubleTouch,
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
      onDoubleClick={onDoubleClick}
      onTouchEnd={onDoubleTouch}
    >
      {children}
    </div>
  );
};

export default TaroInner;
