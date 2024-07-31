// components/TaroCard.tsx
import Image from "next/image";
import styles from "@/styles/TaroCard.module.css";

interface TaroCardProps {
  name: string; // 카드의 이름
  foreImage: string; // 카드 이미지 URL
  onClick?: () => void; // 카드 클릭 시 호출되는 함수
}

const backImage =
  "https://plus.unsplash.com/premium_photo-1672329279267-7c07d221051b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const TaroCard: React.FC<TaroCardProps> = ({ name, foreImage, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <Image
        src={foreImage}
        alt={name}
        width={200}
        height={300}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{name}</h2>
      </div>
    </div>
  );
};

export default TaroCard;
