import Layout from "@/components/Layout";
import useDoubleTouch from "@/util/onDoubleTouch";
import { useState } from "react";

export default function TestPage() {
  const [dbTouchNum, setDbTouchNum] = useState<boolean>(false);

  const handleDoubleClick = () => {
    console.log("Double touched!");
    setDbTouchNum(!dbTouchNum);
  };

  const handleDoubleTouch = useDoubleTouch(() => {
    handleDoubleClick;
  });

  return (
    <Layout>
      <h2>testpage</h2>
      <div
        onTouchEnd={handleDoubleTouch}
        onDoubleClick={handleDoubleClick}
        style={{
          width: "180px",
          height: "60px",
          backgroundColor: `${dbTouchNum ? "red" : "yellow"}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        더블 터치 해보세요!
      </div>
    </Layout>
  );
}
