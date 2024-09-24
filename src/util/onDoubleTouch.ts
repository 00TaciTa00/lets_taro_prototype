import { useRef, useState } from "react";

// 더블 터치 이벤트를 처리하는 함수
const useDoubleTouch = (
  callback: (arg?: any) => void,
  delay: number = 100,
  cooldown: number = 50
) => {
  const lastTouch = useRef<number | null>(null);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);

  const handleTouch = (arg?: any) => {
    const now = Date.now();
    console.log("touch", lastTouch, isCooldown);
    if (isCooldown) {
      console.log("return");
      return; // 쿨다운 상태일 때는 callback을 실행하지 않습니다.
    }
    if (lastTouch.current !== null && now - lastTouch.current < delay) {
      console.log("callback");
      callback(arg);
      setIsCooldown(true); // callback이 실행된 후 쿨다운 상태로 설정합니다.
      setTimeout(() => {
        setIsCooldown(false); // 지연 시간 후에 쿨다운 상태를 해제합니다.
      }, cooldown);
    }
    lastTouch.current = now;
  };

  return handleTouch;
};

export default useDoubleTouch;
